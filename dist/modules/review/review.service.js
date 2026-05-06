"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ReviewService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../../shared/database/prisma.service.js");
let ReviewService = ReviewService_1 = class ReviewService {
    prisma;
    logger = new common_1.Logger(ReviewService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
        this.logger.log(`Review submission attempt - User ID: ${userId}, Product ID: ${dto.productId}`);
        const product = await this.prisma.product.findUnique({
            where: { id: dto.productId }
        });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        const purchase = await this.prisma.order.findFirst({
            where: {
                user_id: userId,
                status: { in: ['delivered', 'completed', 'processed'] },
                items: {
                    some: {
                        product_variant: {
                            product_id: dto.productId
                        }
                    }
                }
            }
        });
        if (!purchase) {
            throw new common_1.ForbiddenException('You can only review products you have purchased and received.');
        }
        return this.prisma.review.create({
            data: {
                user_id: userId,
                product_id: dto.productId,
                rating: dto.rating,
                comment: dto.comment,
            },
            include: {
                user: { select: { name: true } }
            }
        });
    }
    async findByProduct(productId, limit = 10, offset = 0) {
        this.logger.log(`Fetching reviews for Product ID: ${productId}`);
        return this.prisma.review.findMany({
            where: { product_id: productId },
            take: limit,
            skip: offset,
            include: {
                user: { select: { name: true } },
            },
            orderBy: { created_at: 'desc' },
        });
    }
    async getMyReviews(userId, limit = 10, offset = 0) {
        this.logger.log(`Fetching reviews authored by User ID: ${userId}`);
        return this.prisma.review.findMany({
            where: { user_id: userId },
            take: limit,
            skip: offset,
            include: {
                product: true,
            },
            orderBy: { created_at: 'desc' },
        });
    }
};
exports.ReviewService = ReviewService;
exports.ReviewService = ReviewService = ReviewService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], ReviewService);
//# sourceMappingURL=review.service.js.map