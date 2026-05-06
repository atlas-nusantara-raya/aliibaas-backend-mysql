import { OrderService } from './order.service.js';
import { UpdateOrderStatusDto, UpdateTrackingDto } from './dto/create-order.dto.js';
import { CheckoutDto } from './dto/checkout.dto.js';
import { PaginationDto } from '../../shared/dto/pagination.dto.js';
export declare class OrderController {
    private orderService;
    constructor(orderService: OrderService);
    checkout(req: any, checkoutDto: CheckoutDto): Promise<{
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
                    base_price: import("@prisma/client/runtime/library").Decimal | null;
                    is_active: number | null;
                    gender_id: number | null;
                } | null;
            } & {
                id: number;
                stock: number | null;
                price: import("@prisma/client/runtime/library").Decimal | null;
                sku: string | null;
                discount_price: import("@prisma/client/runtime/library").Decimal | null;
                discount_percent: import("@prisma/client/runtime/library").Decimal | null;
                discount_start: Date | null;
                discount_end: Date | null;
                color_id: number | null;
                size_id: number | null;
                product_id: number | null;
            }) | null;
        } & {
            id: number;
            price: import("@prisma/client/runtime/library").Decimal | null;
            product_variant_id: number | null;
            qty: number | null;
            order_id: number | null;
            subtotal: import("@prisma/client/runtime/library").Decimal | null;
        })[];
    } & {
        id: number;
        name: string | null;
        phone: string | null;
        user_id: string | null;
        status: string | null;
        idempotency_key: string | null;
        order_date: Date | null;
        total_amount: import("@prisma/client/runtime/library").Decimal | null;
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
        shipping_cost: import("@prisma/client/runtime/library").Decimal | null;
        courier: string | null;
        courier_service: string | null;
    }>;
    getMyOrders(req: any, pagination: PaginationDto): Promise<({
        items: ({
            product_variant: ({
                product: {
                    id: number;
                    name: string | null;
                    created_at: Date | null;
                    description: string | null;
                    category_id: number | null;
                    brand_id: number | null;
                    base_price: import("@prisma/client/runtime/library").Decimal | null;
                    is_active: number | null;
                    gender_id: number | null;
                } | null;
            } & {
                id: number;
                stock: number | null;
                price: import("@prisma/client/runtime/library").Decimal | null;
                sku: string | null;
                discount_price: import("@prisma/client/runtime/library").Decimal | null;
                discount_percent: import("@prisma/client/runtime/library").Decimal | null;
                discount_start: Date | null;
                discount_end: Date | null;
                color_id: number | null;
                size_id: number | null;
                product_id: number | null;
            }) | null;
        } & {
            id: number;
            price: import("@prisma/client/runtime/library").Decimal | null;
            product_variant_id: number | null;
            qty: number | null;
            order_id: number | null;
            subtotal: import("@prisma/client/runtime/library").Decimal | null;
        })[];
    } & {
        id: number;
        name: string | null;
        phone: string | null;
        user_id: string | null;
        status: string | null;
        idempotency_key: string | null;
        order_date: Date | null;
        total_amount: import("@prisma/client/runtime/library").Decimal | null;
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
        shipping_cost: import("@prisma/client/runtime/library").Decimal | null;
        courier: string | null;
        courier_service: string | null;
    })[]>;
    findAll(pagination: PaginationDto): Promise<({
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
                price: import("@prisma/client/runtime/library").Decimal | null;
                sku: string | null;
                discount_price: import("@prisma/client/runtime/library").Decimal | null;
                discount_percent: import("@prisma/client/runtime/library").Decimal | null;
                discount_start: Date | null;
                discount_end: Date | null;
                color_id: number | null;
                size_id: number | null;
                product_id: number | null;
            } | null;
        } & {
            id: number;
            price: import("@prisma/client/runtime/library").Decimal | null;
            product_variant_id: number | null;
            qty: number | null;
            order_id: number | null;
            subtotal: import("@prisma/client/runtime/library").Decimal | null;
        })[];
    } & {
        id: number;
        name: string | null;
        phone: string | null;
        user_id: string | null;
        status: string | null;
        idempotency_key: string | null;
        order_date: Date | null;
        total_amount: import("@prisma/client/runtime/library").Decimal | null;
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
        shipping_cost: import("@prisma/client/runtime/library").Decimal | null;
        courier: string | null;
        courier_service: string | null;
    })[]>;
    updateStatus(id: number, updateOrderStatusDto: UpdateOrderStatusDto): Promise<{
        id: number;
        name: string | null;
        phone: string | null;
        user_id: string | null;
        status: string | null;
        idempotency_key: string | null;
        order_date: Date | null;
        total_amount: import("@prisma/client/runtime/library").Decimal | null;
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
        shipping_cost: import("@prisma/client/runtime/library").Decimal | null;
        courier: string | null;
        courier_service: string | null;
    }>;
    getPaymentDetails(id: number, req: any): Promise<{
        order_id: number;
        total_amount: import("@prisma/client/runtime/library").Decimal | null;
        payment_details: {
            id: number;
            order_id: number | null;
            amount: import("@prisma/client/runtime/library").Decimal | null;
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
    updateTracking(id: number, dto: UpdateTrackingDto): Promise<{
        id: number;
        name: string | null;
        phone: string | null;
        user_id: string | null;
        status: string | null;
        idempotency_key: string | null;
        order_date: Date | null;
        total_amount: import("@prisma/client/runtime/library").Decimal | null;
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
        shipping_cost: import("@prisma/client/runtime/library").Decimal | null;
        courier: string | null;
        courier_service: string | null;
    }>;
    trackShipment(id: number, req: any): Promise<any>;
}
