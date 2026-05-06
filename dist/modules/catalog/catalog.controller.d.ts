import { CatalogService } from './catalog.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PaginationDto } from '../../shared/dto/pagination.dto.js';
export declare class CatalogController {
    private catalogService;
    constructor(catalogService: CatalogService);
    uploadImages(id: number, files: Express.Multer.File[]): Promise<any>;
    deleteImage(imageId: number): Promise<{
        success: boolean;
    } | undefined>;
    setPrimary(imageId: number): Promise<{
        success: boolean;
    }>;
    create(createProductDto: CreateProductDto): Promise<any>;
    findAll(pagination: PaginationDto): Promise<any[]>;
    search(query: string, pagination: PaginationDto): Promise<any[]>;
    findOne(id: number): Promise<any>;
    findByGender(code: string, pagination: PaginationDto): Promise<any[]>;
    getRelated(id: number): Promise<any[]>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<{
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
        category: {
            id: number;
            name: string | null;
            created_at: Date | null;
            display_order: number | null;
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
    }>;
    remove(id: number): Promise<{
        success: boolean;
    }>;
    seed(count: number): Promise<{
        message: string;
        seededProducts: string[];
    }>;
}
