import { PrismaService } from '../../shared/database/prisma.service.js';
import { CreateBrandDto, UpdateBrandDto } from './dto/brand.dto.js';
export declare class BrandService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    findAll(limit?: number, offset?: number): Promise<{
        id: number;
        name: string | null;
        description: string | null;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        name: string | null;
        description: string | null;
    }>;
    create(dto: CreateBrandDto): Promise<{
        id: number;
        name: string | null;
        description: string | null;
    }>;
    update(id: number, dto: UpdateBrandDto): Promise<{
        id: number;
        name: string | null;
        description: string | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string | null;
        description: string | null;
    }>;
    findProductsByBrand(brandId: number, limit?: number, offset?: number): Promise<({
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
    })[]>;
}
