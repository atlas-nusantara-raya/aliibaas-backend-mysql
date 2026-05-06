import { PrismaService } from '../../shared/database/prisma.service.js';
export declare class WishlistService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    getWishlist(userId: string, limit?: number, offset?: number): Promise<({
        product: ({
            variants: {
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
            }[];
            images: {
                id: number;
                created_at: Date | null;
                product_id: number | null;
                image_url: string | null;
                is_primary: number | null;
            }[];
            category: {
                id: number;
                name: string | null;
                created_at: Date | null;
                display_order: number | null;
            } | null;
            brand: {
                id: number;
                name: string | null;
                description: string | null;
            } | null;
        } & {
            id: number;
            name: string | null;
            created_at: Date | null;
            description: string | null;
            category_id: number | null;
            brand_id: number | null;
            base_price: import("@prisma/client/runtime/library").Decimal | null;
            is_active: number | null;
            gender_id: number | null;
        }) | null;
    } & {
        id: number;
        created_at: Date | null;
        user_id: string | null;
        product_id: number | null;
    })[]>;
    addToWishlist(userId: string, productId: number): Promise<{
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
        created_at: Date | null;
        user_id: string | null;
        product_id: number | null;
    }>;
    removeFromWishlist(userId: string, productId: number): Promise<{
        id: number;
        created_at: Date | null;
        user_id: string | null;
        product_id: number | null;
    }>;
}
