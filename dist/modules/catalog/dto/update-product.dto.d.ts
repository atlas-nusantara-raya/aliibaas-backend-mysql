import { CreateProductDto, CreateVariantDto } from './create-product.dto.js';
declare const UpdateProductDto_base: import("@nestjs/common").Type<Partial<CreateProductDto>>;
export declare class UpdateProductDto extends UpdateProductDto_base {
    name?: string;
    description?: string;
    price?: number;
    categoryId?: number;
    variants?: CreateVariantDto[];
}
export {};
