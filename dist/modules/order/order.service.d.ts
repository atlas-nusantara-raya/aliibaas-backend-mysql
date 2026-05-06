import { PrismaService } from '../../shared/database/prisma.service.js';
import { Prisma } from '@prisma/client';
import { CartService } from '../cart/cart.service.js';
import { KommerceService } from '../../external/kommerce/kommerce.service.js';
import { NotificationService } from '../notification/notification.service.js';
export declare class OrderService {
    private prisma;
    private cartService;
    private kommerceService;
    private notificationService;
    private readonly logger;
    constructor(prisma: PrismaService, cartService: CartService, kommerceService: KommerceService, notificationService: NotificationService);
    checkout(userId: string, cartId: number, addressId: number, paymentMethodCode: string, courier: string, courierService: string, shippingCost: number, idempotencyKey?: string): Promise<{
        user: {
            password: string | null;
            id: string;
            email: string | null;
            name: string | null;
            phone: string | null;
            created_at: Date | null;
        } | null;
        items: ({
            product_variant: ({
                product: {
                    id: number;
                    name: string | null;
                    created_at: Date | null;
                    description: string | null;
                    category_id: number | null;
                    brand_id: number | null;
                    base_price: Prisma.Decimal | null;
                    is_active: number | null;
                    gender_id: number | null;
                } | null;
            } & {
                id: number;
                stock: number | null;
                price: Prisma.Decimal | null;
                sku: string | null;
                discount_price: Prisma.Decimal | null;
                discount_percent: Prisma.Decimal | null;
                discount_start: Date | null;
                discount_end: Date | null;
                color_id: number | null;
                size_id: number | null;
                product_id: number | null;
            }) | null;
        } & {
            id: number;
            price: Prisma.Decimal | null;
            product_variant_id: number | null;
            qty: number | null;
            order_id: number | null;
            subtotal: Prisma.Decimal | null;
        })[];
    } & {
        id: number;
        name: string | null;
        phone: string | null;
        user_id: string | null;
        status: string | null;
        idempotency_key: string | null;
        order_date: Date | null;
        total_amount: Prisma.Decimal | null;
        payment_status: string | null;
        address: string | null;
        province_id: string | null;
        province_name: string | null;
        city_id: string | null;
        city_name: string | null;
        district_id: string | null;
        district_name: string | null;
        postal_code: string | null;
        order_status_id: number | null;
        payment_status_id: number | null;
        shipping_cost: Prisma.Decimal | null;
        courier: string | null;
        courier_service: string | null;
    }>;
    postCheckoutCleanup(userId: string): Promise<void>;
    getMyOrders(userId: string, limit?: number, offset?: number): Promise<({
        items: ({
            product_variant: ({
                product: {
                    id: number;
                    name: string | null;
                    created_at: Date | null;
                    description: string | null;
                    category_id: number | null;
                    brand_id: number | null;
                    base_price: Prisma.Decimal | null;
                    is_active: number | null;
                    gender_id: number | null;
                } | null;
            } & {
                id: number;
                stock: number | null;
                price: Prisma.Decimal | null;
                sku: string | null;
                discount_price: Prisma.Decimal | null;
                discount_percent: Prisma.Decimal | null;
                discount_start: Date | null;
                discount_end: Date | null;
                color_id: number | null;
                size_id: number | null;
                product_id: number | null;
            }) | null;
        } & {
            id: number;
            price: Prisma.Decimal | null;
            product_variant_id: number | null;
            qty: number | null;
            order_id: number | null;
            subtotal: Prisma.Decimal | null;
        })[];
    } & {
        id: number;
        name: string | null;
        phone: string | null;
        user_id: string | null;
        status: string | null;
        idempotency_key: string | null;
        order_date: Date | null;
        total_amount: Prisma.Decimal | null;
        payment_status: string | null;
        address: string | null;
        province_id: string | null;
        province_name: string | null;
        city_id: string | null;
        city_name: string | null;
        district_id: string | null;
        district_name: string | null;
        postal_code: string | null;
        order_status_id: number | null;
        payment_status_id: number | null;
        shipping_cost: Prisma.Decimal | null;
        courier: string | null;
        courier_service: string | null;
    })[]>;
    getAllOrders(limit?: number, offset?: number): Promise<({
        user: {
            password: string | null;
            id: string;
            email: string | null;
            name: string | null;
            phone: string | null;
            created_at: Date | null;
        } | null;
        items: ({
            product_variant: {
                id: number;
                stock: number | null;
                price: Prisma.Decimal | null;
                sku: string | null;
                discount_price: Prisma.Decimal | null;
                discount_percent: Prisma.Decimal | null;
                discount_start: Date | null;
                discount_end: Date | null;
                color_id: number | null;
                size_id: number | null;
                product_id: number | null;
            } | null;
        } & {
            id: number;
            price: Prisma.Decimal | null;
            product_variant_id: number | null;
            qty: number | null;
            order_id: number | null;
            subtotal: Prisma.Decimal | null;
        })[];
    } & {
        id: number;
        name: string | null;
        phone: string | null;
        user_id: string | null;
        status: string | null;
        idempotency_key: string | null;
        order_date: Date | null;
        total_amount: Prisma.Decimal | null;
        payment_status: string | null;
        address: string | null;
        province_id: string | null;
        province_name: string | null;
        city_id: string | null;
        city_name: string | null;
        district_id: string | null;
        district_name: string | null;
        postal_code: string | null;
        order_status_id: number | null;
        payment_status_id: number | null;
        shipping_cost: Prisma.Decimal | null;
        courier: string | null;
        courier_service: string | null;
    })[]>;
    updateOrderStatus(orderId: number, statusCode: string): Promise<{
        id: number;
        name: string | null;
        phone: string | null;
        user_id: string | null;
        status: string | null;
        idempotency_key: string | null;
        order_date: Date | null;
        total_amount: Prisma.Decimal | null;
        payment_status: string | null;
        address: string | null;
        province_id: string | null;
        province_name: string | null;
        city_id: string | null;
        city_name: string | null;
        district_id: string | null;
        district_name: string | null;
        postal_code: string | null;
        order_status_id: number | null;
        payment_status_id: number | null;
        shipping_cost: Prisma.Decimal | null;
        courier: string | null;
        courier_service: string | null;
    }>;
    getPaymentDetails(userId: string, orderId: number): Promise<{
        order_id: number;
        total_amount: Prisma.Decimal | null;
        payment_details: {
            id: number;
            order_id: number | null;
            amount: Prisma.Decimal | null;
            payment_id: string | null;
            payment_method: string | null;
            payment_date: Date | null;
            status: string | null;
            transaction_id: string | null;
            payment_method_id: number | null;
            receipt_url: string | null;
            payment_url: string | null;
            va_number: string | null;
            bank_code: string | null;
            bank_name: string | null;
            qr_string: string | null;
            expired_at: Date | null;
        };
        qr_code_base64: string | null;
    }>;
    updateTrackingNumber(orderId: number, trackingNumber: string, courier?: string): Promise<{
        id: number;
        name: string | null;
        phone: string | null;
        user_id: string | null;
        status: string | null;
        idempotency_key: string | null;
        order_date: Date | null;
        total_amount: Prisma.Decimal | null;
        payment_status: string | null;
        address: string | null;
        province_id: string | null;
        province_name: string | null;
        city_id: string | null;
        city_name: string | null;
        district_id: string | null;
        district_name: string | null;
        postal_code: string | null;
        order_status_id: number | null;
        payment_status_id: number | null;
        shipping_cost: Prisma.Decimal | null;
        courier: string | null;
        courier_service: string | null;
    }>;
    trackOrder(orderId: number, userId: string): Promise<any>;
}
