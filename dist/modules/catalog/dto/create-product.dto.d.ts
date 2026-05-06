export declare class CreateVariantDto {
    colorId: number;
    sizeId: number;
    stock: number;
    variantPrice: number;
}
export declare class CreateProductDto {
    name: string;
    description: string;
    categoryId: number;
    brandId: number;
    price: number;
    genderId: number;
    variants: CreateVariantDto[];
}
