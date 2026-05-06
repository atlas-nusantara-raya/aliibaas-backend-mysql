import { PrismaService } from '../../shared/database/prisma.service.js';
import { CreateReviewDto } from './dto/create-review.dto.js';
export declare class ReviewService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    create(userId: string, dto: CreateReviewDto): Promise<{
        user: {
            name: string | null;
        } | null;
    } & {
        id: number;
        created_at: Date | null;
        user_id: string | null;
        product_id: number | null;
        rating: number | null;
        comment: string | null;
    }>;
    findByProduct(productId: number, limit?: number, offset?: number): Promise<({
        user: {
            name: string | null;
        } | null;
    } & {
        id: number;
        created_at: Date | null;
        user_id: string | null;
        product_id: number | null;
        rating: number | null;
        comment: string | null;
    })[]>;
    getMyReviews(userId: string, limit?: number, offset?: number): Promise<({
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
        rating: number | null;
        comment: string | null;
    })[]>;
}
