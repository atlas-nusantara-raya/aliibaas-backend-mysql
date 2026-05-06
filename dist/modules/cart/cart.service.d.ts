import { PrismaService } from '../../shared/database/prisma.service.js';
export declare class CartService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    getCart(userId: string): Promise<{
        cartId: any;
        itemsCount: any;
        items: any;
        totalAmount: any;
    } | {
        itemsCount: number;
        items: never[];
        totalAmount: number;
    }>;
    addItem(userId: string, variantId: number, qty: number, cartId?: number): Promise<{
        cartId: any;
        itemsCount: any;
        items: any;
        totalAmount: any;
    } | {
        itemsCount: number;
        items: never[];
        totalAmount: number;
    }>;
    incrementItem(userId: string, variantId: number, cartId: number): Promise<{
        cartId: any;
        itemsCount: any;
        items: any;
        totalAmount: any;
    } | {
        itemsCount: number;
        items: never[];
        totalAmount: number;
    }>;
    decrementItem(userId: string, variantId: number, cartId: number): Promise<{
        cartId: any;
        itemsCount: any;
        items: any;
        totalAmount: any;
    } | {
        itemsCount: number;
        items: never[];
        totalAmount: number;
    }>;
    removeItem(userId: string, variantId: number): Promise<{
        cartId: any;
        itemsCount: any;
        items: any;
        totalAmount: any;
    } | {
        itemsCount: number;
        items: never[];
        totalAmount: number;
    } | undefined>;
    clearCart(userId: string): Promise<{
        itemsCount: number;
        items: never[];
        totalAmount: number;
    } | undefined>;
    private transformCart;
}
