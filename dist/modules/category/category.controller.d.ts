import { CategoryService } from './category.service.js';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto.js';
import { PaginationDto } from '../../shared/dto/pagination.dto.js';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    findAll(pagination: PaginationDto): Promise<{
        id: number;
        name: string | null;
        created_at: Date | null;
        display_order: number | null;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        name: string | null;
        created_at: Date | null;
        display_order: number | null;
    }>;
    findProducts(id: number, pagination: PaginationDto): Promise<({
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
    create(dto: CreateCategoryDto): Promise<{
        id: number;
        name: string | null;
        created_at: Date | null;
        display_order: number | null;
    }>;
    update(id: number, dto: UpdateCategoryDto): Promise<{
        id: number;
        name: string | null;
        created_at: Date | null;
        display_order: number | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string | null;
        created_at: Date | null;
        display_order: number | null;
    }>;
}
