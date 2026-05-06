import { CartService } from './cart.service.js';
import { AddItemDto } from './dto/add-item.dto.js';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getCart(req: any): Promise<{
        cartId: any;
        itemsCount: any;
        items: any;
        totalAmount: any;
    } | {
        itemsCount: number;
        items: never[];
        totalAmount: number;
    }>;
    addItem(req: any, addItemDto: AddItemDto): Promise<{
        cartId: any;
        itemsCount: any;
        items: any;
        totalAmount: any;
    } | {
        itemsCount: number;
        items: never[];
        totalAmount: number;
    }>;
    incrementItem(req: any, cartId: number, variantId: number): Promise<{
        cartId: any;
        itemsCount: any;
        items: any;
        totalAmount: any;
    } | {
        itemsCount: number;
        items: never[];
        totalAmount: number;
    }>;
    decrementItem(req: any, cartId: number, variantId: number): Promise<{
        cartId: any;
        itemsCount: any;
        items: any;
        totalAmount: any;
    } | {
        itemsCount: number;
        items: never[];
        totalAmount: number;
    }>;
    removeItem(req: any, variantId: number): Promise<{
        cartId: any;
        itemsCount: any;
        items: any;
        totalAmount: any;
    } | {
        itemsCount: number;
        items: never[];
        totalAmount: number;
    } | undefined>;
    clearCart(req: any): Promise<{
        itemsCount: number;
        items: never[];
        totalAmount: number;
    } | undefined>;
}
