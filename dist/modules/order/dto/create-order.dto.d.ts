declare class OrderItemDto {
    variantId: number;
    quantity: number;
}
export declare class CreateOrderDto {
    addressId: number;
    paymentMethodCode: string;
    items: OrderItemDto[];
}
export declare class UpdateOrderStatusDto {
    status: string;
}
export declare class UpdateTrackingDto {
    trackingNumber: string;
    courier?: string;
}
export {};
