import { InventoryService } from './inventory.service.js';
import { UpdateStockDto } from './dto/update-stock.dto.js';
export declare class InventoryController {
    private inventoryService;
    constructor(inventoryService: InventoryService);
    getStock(variantId: number): Promise<{
        stock: number | null;
    }>;
    updateStock(variantId: number, updateStockDto: UpdateStockDto): Promise<{
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
