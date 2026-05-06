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
var KommerceService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KommerceService = void 0;
const common_1 = require("@nestjs/common");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const crypto = __importStar(require("crypto"));
const prisma_service_js_1 = require("../../shared/database/prisma.service.js");
const notification_service_js_1 = require("../../modules/notification/notification.service.js");
const email_service_js_1 = require("../../shared/email/email.service.js");
let KommerceService = KommerceService_1 = class KommerceService {
    prisma;
    notificationService;
    emailService;
    logger = new common_1.Logger(KommerceService_1.name);
    shippingApiKey = process.env.KOMMERCE_API_KEY_SHIPPING;
    paymentApiKey = process.env.KOMMERCE_API_KEY_PAYMENT;
    collaboratorBaseUrl = process.env.KOMMERCE_PAYMENT_BASE_URL || 'https://api-sandbox.collaborator.komerce.id/user';
    shippingBaseUrl = process.env.KOMMERCE_SHIPPING_BASE_URL || 'https://rajaongkir.komerce.id/api/v1';
    callbackKey = process.env.KOMMERCE_CALLBACK_API_KEY;
    callbackUrl = process.env.KOMMERCE_CALLBACK_URL;
    cacheDir = path.join(process.cwd(), 'storage', 'cache', 'kommerce');
    TTL_DAYS = 7;
    constructor(prisma, notificationService, emailService) {
        this.prisma = prisma;
        this.notificationService = notificationService;
        this.emailService = emailService;
        this.ensureCacheDirExists();
    }
    ensureCacheDirExists() {
        if (!fs.existsSync(this.cacheDir)) {
            fs.mkdirSync(this.cacheDir, { recursive: true });
        }
    }
    getCachePath(fileName) {
        return path.join(this.cacheDir, fileName);
    }
    isCacheValid(filePath, ttlInDays = this.TTL_DAYS) {
        if (!fs.existsSync(filePath))
            return false;
        const stats = fs.statSync(filePath);
        const now = new Date().getTime();
        const fileTime = new Date(stats.mtime).getTime();
        const diffInDays = (now - fileTime) / (1000 * 60 * 60 * 24);
        return diffInDays < ttlInDays;
    }
    async callApi(endpoint, method, body, isFormEncoded = false, useShippingUrl = false) {
        if (!this.shippingApiKey) {
            throw new Error('KOMMERCE_API_KEY_SHIPPING is not defined in .env');
        }
        const baseUrl = useShippingUrl ? this.shippingBaseUrl : this.collaboratorBaseUrl;
        const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
        const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
        const url = `${cleanBaseUrl}${cleanEndpoint}`;
        this.logger.log(`${method} to Kommerce API (${useShippingUrl ? 'Shipping' : 'Collaborator'}): ${url}`);
        const headers = {};
        if (useShippingUrl) {
            headers['Key'] = this.shippingApiKey || '';
        }
        else {
            headers['x-api-key'] = this.paymentApiKey || '';
        }
        if (isFormEncoded) {
            headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }
        else {
            headers['Content-Type'] = 'application/json';
        }
        const response = await fetch(url, {
            method: method,
            headers: headers,
            body: body ? (isFormEncoded ? new URLSearchParams(body).toString() : JSON.stringify(body)) : undefined,
        });
        if (!response.ok) {
            const errorBody = await response.text();
            this.logger.error(`Kommerce API error: ${response.status} - ${errorBody}`);
            throw new Error(`Kommerce API error: ${response.status}`);
        }
        return await response.json();
    }
    async getPaymentMethods() {
        return this.callApi('/api/v1/user/methods', 'GET', null, false, false);
    }
    async createPayment(dto) {
        const paymentData = {
            ...(dto || {}),
            callback_url: dto?.callback_url || this.callbackUrl,
            callback_API_KEY: dto?.callback_API_KEY || this.callbackKey,
        };
        this.logger.debug(`Sending payment data to Kommerce: ${JSON.stringify(paymentData)}`);
        const response = await this.callApi('/api/v1/user/payment/create', 'POST', paymentData, false, false);
        if (response && response.data) {
            const d = response.data;
            let internalOrderId = null;
            if (dto.order_id) {
                const numericId = dto.order_id.replace(/\D/g, '');
                if (numericId) {
                    internalOrderId = parseInt(numericId);
                }
            }
            await this.prisma.payment.create({
                data: {
                    order_id: internalOrderId,
                    payment_id: d.payment_id,
                    payment_url: d.payment_url,
                    va_number: d.va_number,
                    bank_code: d.bank_code,
                    bank_name: d.bank_name,
                    amount: d.amount,
                    status: d.status.toLowerCase(),
                    expired_at: d.expired_at ? this.parseDateWithTimezone(d.expired_at) : null,
                    payment_method: d.bank_name || d.bank_code,
                    transaction_id: d.payment_id
                }
            });
        }
        return response;
    }
    async getPaymentStatus(paymentId) {
        const response = await this.callApi(`/api/v1/user/payment/status/${paymentId}`, 'GET', null, false, false);
        if (response && response.data) {
            const d = response.data;
            const status = d.status.toLowerCase();
            const payment = await this.prisma.payment.findUnique({
                where: { payment_id: paymentId }
            });
            if (payment) {
                const oldStatus = payment.status;
                await this.prisma.payment.update({
                    where: { id: payment.id },
                    data: { status }
                });
                if (oldStatus !== status && payment.order_id) {
                    let title = 'Update Pembayaran';
                    let message = `Status pembayaran untuk Order #${payment.order_id} berubah menjadi ${status.toUpperCase()}.`;
                    if (status === 'paid') {
                        title = 'Pembayaran Berhasil! 🎉';
                        message = `Terima kasih! Pembayaran untuk Order #${payment.order_id} telah kami terima. Pesanan segera diproses.`;
                    }
                    else if (status === 'expired') {
                        title = 'Pembayaran Kadaluarsa ⏰';
                        message = `Batas waktu pembayaran untuk Order #${payment.order_id} telah habis.`;
                    }
                    const order = await this.prisma.order.findUnique({ where: { id: payment.order_id } });
                    if (order?.user_id) {
                        await this.notificationService.createNotification(order.user_id, title, message);
                        const user = await this.prisma.user.findUnique({ where: { id: order.user_id } });
                        if (user?.email) {
                            const html = this.emailService.getOrderStatusTemplate(user.name || 'Customer', order.id, status, Number(order.total_amount));
                            await this.emailService.sendHtmlEmail(user.email, title, html).catch(err => this.logger.error(`Failed to send status email: ${err.message}`));
                        }
                    }
                }
                if (status === 'paid' && payment.order_id) {
                    const paidStatus = await this.prisma.mtStatus.findFirst({
                        where: { type_status: 'payment', code: 'paid' }
                    });
                    await this.prisma.order.update({
                        where: { id: payment.order_id },
                        data: {
                            payment_status: 'paid',
                            payment_status_id: paidStatus?.id,
                            status: 'processed'
                        }
                    });
                    this.logger.log(`Order ${payment.order_id} successfully marked as PAID.`);
                }
                else if ((status === 'expired' || status === 'canceled' || status === 'failed') && payment.order_id) {
                    await this.prisma.$transaction(async (tx) => {
                        const order = await tx.order.findUnique({
                            where: { id: payment.order_id },
                            include: { items: true }
                        });
                        if (order && order.status !== 'cancelled') {
                            await tx.order.update({
                                where: { id: order.id },
                                data: { status: 'cancelled' }
                            });
                            for (const item of order.items) {
                                if (item.product_variant_id && item.qty) {
                                    await tx.productVariant.update({
                                        where: { id: item.product_variant_id },
                                        data: { stock: { increment: item.qty } }
                                    });
                                }
                            }
                            this.logger.log(`Order ${order.id} automatically CANCELLED (Status: ${status}).`);
                        }
                    });
                }
            }
        }
        return response;
    }
    async cancelPayment(dto) {
        const response = await this.callApi('/api/v1/user/payment/cancel', 'POST', dto, false, false);
        if (response && response.meta.code === 200) {
            const payment = await this.prisma.payment.findUnique({
                where: { payment_id: dto.payment_id }
            });
            if (payment) {
                await this.prisma.payment.update({
                    where: { id: payment.id },
                    data: { status: 'canceled' }
                });
                const canceledStatus = await this.prisma.mtStatus.findFirst({
                    where: { type_status: 'payment', code: 'canceled' }
                });
                await this.prisma.order.update({
                    where: { id: payment.order_id },
                    data: {
                        payment_status: 'canceled',
                        payment_status_id: canceledStatus?.id
                    }
                });
            }
        }
        return response;
    }
    async handleCallback(body, receivedKey) {
        this.logger.log(`Received callback from Kommerce. Body: ${JSON.stringify(body)}`);
        if (!body) {
            this.logger.error('Callback received but body is undefined or null');
            return { success: false, message: 'Body is required' };
        }
        if (this.callbackKey && receivedKey !== this.callbackKey) {
            this.logger.warn(`Unauthorized callback attempt! Key mismatch.`);
            throw new Error('Unauthorized');
        }
        const { payment_id, status } = body;
        const normalizedStatus = status?.toLowerCase();
        if (!payment_id) {
            this.logger.warn(`Callback missing payment_id: ${JSON.stringify(body)}`);
            return { success: false, message: 'payment_id is missing' };
        }
        const payment = await this.prisma.payment.findUnique({
            where: { payment_id: payment_id }
        });
        if (!payment) {
            this.logger.error(`Payment logic error: payment_id ${payment_id} not found in database.`);
            return { success: false, message: 'Payment not found' };
        }
        const oldStatus = payment.status;
        await this.prisma.payment.update({
            where: { id: payment.id },
            data: {
                status: normalizedStatus,
                payment_date: (normalizedStatus === 'paid') ? new Date() : undefined
            }
        });
        if (oldStatus !== normalizedStatus) {
            let title = 'Update Pembayaran';
            let message = `Status pembayaran untuk Order #${payment.order_id} berubah menjadi ${normalizedStatus.toUpperCase()}.`;
            if (normalizedStatus === 'paid') {
                title = 'Pembayaran Berhasil! 🎉';
                message = `Terima kasih! Pembayaran untuk Order #${payment.order_id} telah kami terima.`;
            }
            else if (normalizedStatus === 'expired') {
                title = 'Pembayaran Kadaluarsa ⏰';
                message = `Batas waktu pembayaran untuk Order #${payment.order_id} telah habis.`;
            }
            if (payment.order_id) {
                const order = await this.prisma.order.findUnique({ where: { id: payment.order_id } });
                if (order?.user_id) {
                    await this.notificationService.createNotification(order.user_id, title, message);
                    const user = await this.prisma.user.findUnique({ where: { id: order.user_id } });
                    if (user?.email) {
                        const html = this.emailService.getOrderStatusTemplate(user.name || 'Customer', order.id, normalizedStatus, Number(order.total_amount));
                        await this.emailService.sendHtmlEmail(user.email, title, html).catch(err => this.logger.error(`Failed to send status email via callback: ${err.message}`));
                    }
                }
            }
        }
        if (normalizedStatus === 'paid') {
            const paidStatus = await this.prisma.mtStatus.findFirst({
                where: { type_status: 'payment', code: 'paid' }
            });
            await this.prisma.order.update({
                where: { id: payment.order_id },
                data: {
                    payment_status: 'paid',
                    payment_status_id: paidStatus?.id,
                    status: 'processed'
                }
            });
            this.logger.log(`Order ${payment.order_id} marked as PAID via callback.`);
        }
        else if (normalizedStatus === 'expired' || normalizedStatus === 'canceled' || normalizedStatus === 'failed') {
            await this.prisma.$transaction(async (tx) => {
                const order = await tx.order.findUnique({
                    where: { id: payment.order_id },
                    include: { items: true }
                });
                if (order && order.status !== 'cancelled') {
                    await tx.order.update({
                        where: { id: order.id },
                        data: { status: 'cancelled' }
                    });
                    for (const item of order.items) {
                        if (item.product_variant_id && item.qty) {
                            await tx.productVariant.update({
                                where: { id: item.product_variant_id },
                                data: { stock: { increment: item.qty } }
                            });
                        }
                    }
                    this.logger.log(`Order ${order.id} CANCELLED via callback (Status: ${normalizedStatus}).`);
                }
            });
        }
        return { success: true };
    }
    parseDateWithTimezone(dateStr) {
        if (!dateStr)
            return new Date();
        if (dateStr.includes(' ') && !dateStr.includes('+') && !dateStr.endsWith('Z')) {
            const formattedDate = dateStr.replace(' ', 'T') + '+07:00';
            return new Date(formattedDate);
        }
        return new Date(dateStr);
    }
    async getProvinces() {
        const cachePath = this.getCachePath('provinces.json');
        if (this.isCacheValid(cachePath)) {
            this.logger.log('Returning provinces from cache');
            return JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
        }
        const response = await this.callApi('/destination/province', 'GET', null, false, true);
        const data = response.data || response;
        fs.writeFileSync(cachePath, JSON.stringify(data, null, 2));
        return data;
    }
    async getCities(provinceId) {
        const cacheFileName = provinceId ? `cities_${provinceId}.json` : 'cities_all.json';
        const cachePath = this.getCachePath(cacheFileName);
        if (this.isCacheValid(cachePath)) {
            this.logger.log(`Returning cities from cache: ${cacheFileName}`);
            return JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
        }
        const endpoint = provinceId ? `/destination/city/${provinceId}` : '/destination/city';
        const response = await this.callApi(endpoint, 'GET', null, false, true);
        const data = response.data || response;
        fs.writeFileSync(cachePath, JSON.stringify(data, null, 2));
        return data;
    }
    async getDistricts(cityId) {
        const cacheFileName = `districts_${cityId}.json`;
        const cachePath = this.getCachePath(cacheFileName);
        if (this.isCacheValid(cachePath)) {
            this.logger.log(`Returning districts from cache: ${cacheFileName}`);
            return JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
        }
        const response = await this.callApi(`/destination/district/${cityId}`, 'GET', null, false, true);
        const data = response.data || response;
        fs.writeFileSync(cachePath, JSON.stringify(data, null, 2));
        return data;
    }
    async getSubdistricts(districtId) {
        const cacheFileName = `subdistricts_${districtId}.json`;
        const cachePath = this.getCachePath(cacheFileName);
        if (this.isCacheValid(cachePath)) {
            this.logger.log(`Returning subdistricts from cache: ${cacheFileName}`);
            return JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
        }
        const response = await this.callApi(`/destination/sub-district/${districtId}`, 'GET', null, false, true);
        const data = response.data || response;
        fs.writeFileSync(cachePath, JSON.stringify(data, null, 2));
        return data;
    }
    ALL_COURIERS = 'jne:sicepat:ide:sap:jnt:ninja:tiki:lion:anteraja:pos:ncs:rex:rpx:sentral:star:wahana:dse';
    async calculateCost(origin, destination, weight, courier, price) {
        const courierStr = courier || this.ALL_COURIERS;
        const priceStr = price || 'lowest';
        const cacheKey = crypto
            .createHash('md5')
            .update(`${origin}-${destination}-${weight}-${courierStr}-${priceStr}`)
            .digest('hex');
        const cacheFileName = `cost_${cacheKey}.json`;
        const cachePath = this.getCachePath(cacheFileName);
        if (this.isCacheValid(cachePath, 1)) {
            this.logger.log(`Returning shipping cost from cache: ${cacheFileName}`);
            return JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
        }
        const response = await this.callApi('/calculate/district/domestic-cost', 'POST', {
            origin,
            destination,
            weight,
            courier: courierStr,
            price: priceStr,
        }, true, true);
        const data = response.data || response;
        fs.writeFileSync(cachePath, JSON.stringify(data, null, 2));
        return data;
    }
    async trackWaybill(awb, courier, phone) {
        const last5Digits = phone.slice(-5);
        const query = new URLSearchParams({
            awb,
            courier,
            last_phone_number: last5Digits,
        }).toString();
        return await this.callApi(`/track/waybill?${query}`, 'GET', null, false, true);
    }
};
exports.KommerceService = KommerceService;
exports.KommerceService = KommerceService = KommerceService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService,
        notification_service_js_1.NotificationService,
        email_service_js_1.EmailService])
], KommerceService);
//# sourceMappingURL=kommerce.service.js.map