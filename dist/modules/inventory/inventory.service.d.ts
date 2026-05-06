import { PrismaService } from '../../shared/database/prisma.service.js';
export declare class InventoryService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    getStock(variantId: number): Promise<{
        stock: number | null;
    }>;
    updateStock(variantId: number, quantityChange: number): Promise<{
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
    }>;
}
