"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var OrderService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../../shared/database/prisma.service.js");
const cart_service_js_1 = require("../cart/cart.service.js");
const kommerce_service_js_1 = require("../../external/kommerce/kommerce.service.js");
const notification_service_js_1 = require("../notification/notification.service.js");
const QRCode = __importStar(require("qrcode"));
let OrderService = OrderService_1 = class OrderService {
    prisma;
    cartService;
    kommerceService;
    notificationService;
    logger = new common_1.Logger(OrderService_1.name);
    constructor(prisma, cartService, kommerceService, notificationService) {
        this.prisma = prisma;
        this.cartService = cartService;
        this.kommerceService = kommerceService;
        this.notificationService = notificationService;
    }
    async checkout(userId, cartId, addressId, paymentMethodCode, courier, courierService, shippingCost, idempotencyKey) {
        this.logger.log(`Initiating checkout - User ID: ${userId}, Cart ID: ${cartId}, Method: ${paymentMethodCode}`);
        const effectiveKey = idempotencyKey || `CART-${userId}-${cartId}`;
        if (effectiveKey) {
            const existingOrder = await this.prisma.order.findUnique({
                where: { idempotency_key: effectiveKey },
                include: { items: { include: { product_variant: { include: { product: true } } } }, user: true }
            });
            if (existingOrder) {
                if (existingOrder.user_id !== userId) {
                    throw new common_1.BadRequestException('Idempotency key already used by another user');
                }
                return existingOrder;
            }
        }
        return this.prisma.$transaction(async (tx) => {
            const address = await tx.userAddress.findUnique({
                where: { id: addressId },
            });
            if (!address || address.user_id !== userId) {
                throw new common_1.NotFoundException('Address not found or unauthorized');
            }
            const paymentMethod = await tx.mtStatus.findFirst({
                where: {
                    type_status: 'payment_method',
                    code: paymentMethodCode.toLowerCase()
                },
            });
            if (!paymentMethod) {
                throw new common_1.BadRequestException(`Invalid payment method code: ${paymentMethodCode}`);
            }
            const cart = await tx.cart.findUnique({
                where: { id: cartId },
                include: { items: { include: { product_variant: true } } },
            });
            if (!cart || cart.user_id !== userId) {
                throw new common_1.NotFoundException('Cart not found or unauthorized');
            }
            if (cart.items.length === 0) {
                throw new common_1.BadRequestException('Cannot checkout with an empty cart');
            }
            const orderStatusPending = await tx.mtStatus.findFirst({ where: { type_status: 'order', code: 'pending' } });
            const paymentStatusPending = await tx.mtStatus.findFirst({ where: { type_status: 'payment', code: 'pending' } });
            let totalAmount = 0;
            const orderItemsData = [];
            for (const item of cart.items) {
                const variant = item.product_variant;
                if (!variant)
                    continue;
                const qty = item.qty || 0;
                try {
                    await tx.productVariant.update({
                        where: {
                            id: variant.id,
                            stock: { gte: qty }
                        },
                        data: { stock: { decrement: qty } },
                    });
                }
                catch (e) {
                    throw new common_1.BadRequestException(`Insufficient stock for variant ${variant.id} (requested ${qty})`);
                }
                const price = Number(variant.price);
                const subtotal = price * qty;
                totalAmount += subtotal;
                orderItemsData.push({
                    product_variant_id: variant.id,
                    qty: qty,
                    price: price,
                    subtotal: subtotal,
                });
            }
            const paymentType = paymentMethodCode.toLowerCase().includes('qris') ? 'qris' : 'bank_transfer';
            const isManualTransfer = paymentType === 'qris' || paymentMethodCode.toLowerCase().includes('transfer');
            const totalOrderAmount = totalAmount + shippingCost;
            const initialOrderStatus = 'pending';
            const initialPaymentStatus = 'pending';
            const orderInclude = {
                items: { include: { product_variant: { include: { product: true } } } },
                user: true,
            };
            const order = await tx.order.create({
                data: {
                    user_id: userId,
                    idempotency_key: effectiveKey,
                    total_amount: totalOrderAmount,
                    shipping_cost: shippingCost,
                    courier: courier,
                    courier_service: courierService,
                    status: initialOrderStatus,
                    payment_status: initialPaymentStatus,
                    name: address.recipient_name,
                    phone: address.phone,
                    address: address.address,
                    province_id: address.province_id,
                    province_name: address.province_name,
                    city_id: address.city_id,
                    city_name: address.city_name,
                    district_id: address.district_id,
                    district_name: address.district_name,
                    postal_code: address.postal_code,
                    order_status_id: orderStatusPending?.id,
                    payment_status_id: paymentStatusPending?.id,
                    items: {
                        create: orderItemsData,
                    },
                },
                include: orderInclude,
            });
            const shipmentStatusPending = await tx.mtStatus.findFirst({ where: { type_status: 'shipment', code: 'pending' } });
            await tx.shipment.create({
                data: {
                    order_id: order.id,
                    courier: `${courier} - ${courierService}`,
                    status: 'pending',
                    shipment_status_id: shipmentStatusPending?.id,
                    tracking_number: `TRX-${order.id}-PENDING`,
                }
            });
            let paymentUrl = null;
            let vaNumber = null;
            let qrString = null;
            let paymentId = null;
            let bankCode = null;
            if (!isManualTransfer) {
                try {
                    const existingPayment = await tx.payment.findFirst({
                        where: {
                            order_id: order.id,
                            status: 'pending'
                        }
                    });
                    if (existingPayment && existingPayment.payment_id) {
                        this.logger.log(`Using existing payment for Order ${order.id}: ${existingPayment.payment_id}`);
                        paymentId = existingPayment.payment_id;
                        paymentUrl = existingPayment.payment_url;
                        vaNumber = existingPayment.va_number;
                        qrString = existingPayment.qr_string;
                        bankCode = existingPayment.bank_code;
                    }
                    else {
                        const kommerceResponse = await this.kommerceService.createPayment({
                            order_id: order.id.toString(),
                            payment_type: paymentType,
                            channel_code: paymentType === 'qris' ? undefined : paymentMethodCode.toUpperCase(),
                            amount: totalOrderAmount,
                            customer: {
                                name: order.user?.name || address.recipient_name || 'Customer',
                                email: order.user?.email || '',
                                phone: order.user?.phone || address.phone || '',
                            },
                            items: order.items.map(item => ({
                                name: item.product_variant?.product?.name || 'Product',
                                quantity: item.qty || 0,
                                price: Number(item.price),
                            })),
                        });
                        if (kommerceResponse.data) {
                            paymentId = kommerceResponse.data.payment_id;
                            paymentUrl = kommerceResponse.data.payment_url;
                            vaNumber = kommerceResponse.data.va_number;
                            qrString = kommerceResponse.data.qr_string;
                            bankCode = kommerceResponse.data.bank_code;
                        }
                    }
                }
                catch (error) {
                    console.error('Failed to create or retrieve Kommerce payment:', error);
                }
            }
            await tx.payment.create({
                data: {
                    order_id: order.id,
                    payment_method_id: paymentMethod.id,
                    payment_method: paymentMethod.code,
                    payment_date: isManualTransfer ? null : null,
                    amount: totalOrderAmount,
                    status: isManualTransfer ? 'pending' : 'pending',
                    transaction_id: paymentId || `TRX-${order.id}`,
                    payment_id: paymentId,
                    payment_url: paymentUrl,
                    va_number: vaNumber,
                    qr_string: qrString,
                    bank_code: bankCode,
                }
            });
            await tx.cartItem.deleteMany({
                where: { cart_id: cart.id },
            });
            try {
                await this.notificationService.createNotification(userId, 'Pesanan Berhasil Dibuat! 📦', `Pesanan #${order.id} telah berhasil dibuat. Silakan selesaikan pembayaran agar segera kami proses.`);
            }
            catch (notifError) {
                this.logger.error(`Gagal mengirim notifikasi checkout: ${notifError.message}`);
            }
            return order;
        });
    }
    async postCheckoutCleanup(userId) {
        await this.cartService.clearCart(userId);
    }
    async getMyOrders(userId, limit = 10, offset = 0) {
        this.logger.log(`Fetching orders for User ID: ${userId}`);
        return this.prisma.order.findMany({
            where: { user_id: userId },
            take: limit,
            skip: offset,
            include: { items: { include: { product_variant: { include: { product: true } } } } },
            orderBy: { order_date: 'desc' },
        });
    }
    async getAllOrders(limit = 10, offset = 0) {
        this.logger.log(`Admin - Fetching all orders (limit: ${limit}, offset: ${offset})`);
        return this.prisma.order.findMany({
            take: limit,
            skip: offset,
            include: { items: { include: { product_variant: true } }, user: true },
            orderBy: { order_date: 'desc' },
        });
    }
    async updateOrderStatus(orderId, statusCode) {
        this.logger.log(`Updating Order ID: ${orderId} to status: ${statusCode}`);
        const status = await this.prisma.mtStatus.findFirst({
            where: { type_status: 'order', code: statusCode }
        });
        if (!status)
            throw new common_1.NotFoundException('Status code not found');
        return this.prisma.order.update({
            where: { id: orderId },
            data: {
                status: statusCode,
                order_status_id: status.id
            },
        });
    }
    async getPaymentDetails(userId, orderId) {
        this.logger.log(`Fetching payment details for Order ID: ${orderId} (User ID: ${userId})`);
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            include: { payments: true }
        });
        if (!order) {
            this.logger.error(`Order ID ${orderId} not found in database.`);
            throw new common_1.NotFoundException('Order not found');
        }
        if (order.user_id !== userId) {
            this.logger.error(`Unauthorized access: Order ${orderId} belongs to User ${order.user_id}, but requested by User ${userId}`);
            throw new common_1.NotFoundException('Order not found or unauthorized');
        }
        const payment = order.payments[0];
        if (!payment) {
            this.logger.error(`Order ${orderId} has no payment records.`);
            throw new common_1.NotFoundException('Payment record not found');
        }
        let qrCodeBase64 = null;
        const isManualTransfer = payment.payment_method?.toLowerCase().includes('qris') || payment.payment_method?.toLowerCase().includes('transfer');
        try {
            if (isManualTransfer && payment.status === 'pending') {
                const qrData = `Rp${Number(payment.amount)}_TO_REKENING_ALLIBAAS_123456789`;
                qrCodeBase64 = await QRCode.toDataURL(qrData);
            }
        }
        catch (qrError) {
            this.logger.error(`Failed to generate QR Code for Order ${orderId}:`, qrError);
        }
        return {
            order_id: order.id,
            total_amount: order.total_amount,
            payment_details: payment,
            qr_code_base64: qrCodeBase64,
        };
    }
    async updateTrackingNumber(orderId, trackingNumber, courier) {
        this.logger.log(`Assigning tracking number ${trackingNumber} to Order ID: ${orderId}`);
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            include: { shipments: true }
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        const shipment = order.shipments[0];
        const shipmentStatusShipped = await this.prisma.mtStatus.findFirst({
            where: { type_status: 'shipment', code: 'shipped' }
        });
        if (shipment) {
            await this.prisma.shipment.update({
                where: { id: shipment.id },
                data: {
                    tracking_number: trackingNumber,
                    courier: courier || order.courier,
                    status: 'shipped',
                    shipment_status_id: shipmentStatusShipped?.id,
                    shipping_date: new Date()
                }
            });
        }
        else {
            await this.prisma.shipment.create({
                data: {
                    order_id: order.id,
                    tracking_number: trackingNumber,
                    courier: courier || order.courier,
                    status: 'shipped',
                    shipment_status_id: shipmentStatusShipped?.id,
                    shipping_date: new Date()
                }
            });
        }
        const orderStatusShipped = await this.prisma.mtStatus.findFirst({
            where: { type_status: 'order', code: 'shipped' }
        });
        return this.prisma.order.update({
            where: { id: orderId },
            data: {
                status: 'shipped',
                order_status_id: orderStatusShipped?.id
            }
        });
    }
    async trackOrder(orderId, userId) {
        this.logger.log(`User ID: ${userId} tracking Order ID: ${orderId}`);
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            include: { shipments: true, user: true }
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        if (order.user_id !== userId) {
            const callingUser = await this.prisma.user.findUnique({
                where: { id: userId },
                include: { roles: { include: { role: true } } }
            });
            const isAdmin = callingUser?.roles.some(r => r.role.name === 'ADMIN');
            if (!isAdmin)
                throw new common_1.NotFoundException('Order not found or unauthorized');
        }
        const shipment = order.shipments[0];
        if (!shipment || !shipment.tracking_number || shipment.tracking_number.includes('PENDING')) {
            throw new common_1.BadRequestException('Tracking information not available yet');
        }
        const courierName = shipment.courier?.split(' - ')[0] || order.courier || '';
        return this.kommerceService.trackWaybill(shipment.tracking_number, courierName, order.phone || order.user?.phone || '');
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = OrderService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService,
        cart_service_js_1.CartService,
        kommerce_service_js_1.KommerceService,
        notification_service_js_1.NotificationService])
], OrderService);
//# sourceMappingURL=order.service.js.map