import { ReviewService } from './review.service.js';
import { CreateReviewDto } from './dto/create-review.dto.js';
import { PaginationDto } from '../../shared/dto/pagination.dto.js';
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    create(req: any, createReviewDto: CreateReviewDto): Promise<{
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
    findByProduct(productId: number, pagination: PaginationDto): Promise<({
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
    getMyReviews(req: any, pagination: PaginationDto): Promise<({
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
