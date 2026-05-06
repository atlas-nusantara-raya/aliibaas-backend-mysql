export declare class KommerceCustomerDto {
    name: string;
    email: string;
    phone: string;
}
export declare class KommerceItemDto {
    name: string;
    quantity: number;
    price: number;
}
export declare class CreateKommercePaymentDto {
    order_id: string;
    payment_type: string;
    channel_code?: string;
    amount: number;
    customer: KommerceCustomerDto;
    items: KommerceItemDto[];
    expiry_duration?: number;
    callback_url?: string;
    callback_API_KEY?: string;
}
export interface KommercePaymentData {
    payment_id: string;
    payment_url: string;
    va_number: string;
    qr_string: string;
    bank_code: string;
    bank_name: string;
    amount: number;
    status: string;
    expired_at: string;
    created_at: string;
}
export interface KommerceResponse<T> {
    meta: {
        message: string;
        code: number;
        status: string;
    };
    data: T;
}
export declare class KommerceCallbackDto {
    payment_id: string;
    order_id: string;
    status: string;
    amount: number;
}
export declare class CancelKommercePaymentDto {
    payment_id: string;
    reason: string;
}
