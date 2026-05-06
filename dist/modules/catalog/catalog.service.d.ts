import { OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../shared/database/prisma.service.js';
import { Prisma } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { EmailService } from '../../shared/email/email.service.js';
import { NotificationService } from '../notification/notification.service.js';
export declare class CatalogService implements OnModuleInit {
    private prisma;
    private emailService;
    private notificationService;
    private readonly logger;
    constructor(prisma: PrismaService, emailService: EmailService, notificationService: NotificationService);
    onModuleInit(): Promise<void>;
    createProduct(dto: CreateProductDto): Promise<any>;
    private notifyAllUsersNewProduct;
    findAll(limit?: number, offset?: number): Promise<any[]>;
    findOne(id: number): Promise<any>;
    updateProduct(id: number, data: UpdateProductDto): Promise<{
        variants: {
            id: number;
            stock: number | null;
            price: Prisma.Decimal | null;
            sku: string | null;
            discount_price: Prisma.Decimal | null;
            discount_percent: Prisma.Decimal | null;
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
        base_price: Prisma.Decimal | null;
        is_active: number | null;
        gender_id: number | null;
    }>;
    deleteProduct(id: number): Promise<{
        success: boolean;
    }>;
    uploadImages(productId: number, files: Express.Multer.File[]): Promise<any>;
    deleteImage(imageId: number): Promise<{
        success: boolean;
    } | undefined>;
    setPrimaryImage(imageId: number): Promise<{
        success: boolean;
    }>;
    search(query: string, limit?: number, offset?: number): Promise<any[]>;
    findProductsByGender(genderCode: string, limit?: number, offset?: number): Promise<any[]>;
    getRelatedProducts(id: number, limit?: number): Promise<any[]>;
    seed(count?: number): Promise<{
        message: string;
        seededProducts: string[];
    }>;
    private formatProductImages;
}
