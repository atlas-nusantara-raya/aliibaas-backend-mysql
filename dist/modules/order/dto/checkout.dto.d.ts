export declare class CheckoutDto {
    addressId: number;
    cartId: number;
    paymentMethodCode: string;
    courier: string;
    courierService: string;
    shippingCost: number;
    idempotencyKey?: string;
}
