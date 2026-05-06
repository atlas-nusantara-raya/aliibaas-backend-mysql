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
var WishlistService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../../shared/database/prisma.service.js");
let WishlistService = WishlistService_1 = class WishlistService {
    prisma;
    logger = new common_1.Logger(WishlistService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getWishlist(userId, limit = 10, offset = 0) {
        this.logger.log(`Fetching wishlist for User ID: ${userId}`);
        return this.prisma.wishlist.findMany({
            where: { user_id: userId },
            take: limit,
            skip: offset,
            include: {
                product: {
                    include: {
                        variants: true,
                        category: true,
                        brand: true,
                        images: { where: { is_primary: 1 } },
                    },
                },
            },
            orderBy: { created_at: 'desc' },
        });
    }
    async addToWishlist(userId, productId) {
        this.logger.log(`Adding Product ID: ${productId} to wishlist for User ID: ${userId}`);
        const product = await this.prisma.product.findUnique({ where: { id: productId } });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        const existing = await this.prisma.wishlist.findUnique({
            where: {
                user_id_product_id: { user_id: userId, product_id: productId },
            },
        });
        if (existing)
            throw new common_1.ConflictException('Product already in wishlist');
        return this.prisma.wishlist.create({
            data: {
                user_id: userId,
                product_id: productId,
            },
            include: { product: true },
        });
    }
    async removeFromWishlist(userId, productId) {
        this.logger.log(`Removing Product ID: ${productId} from wishlist for User ID: ${userId}`);
        const existing = await this.prisma.wishlist.findUnique({
            where: {
                user_id_product_id: { user_id: userId, product_id: productId },
            },
        });
        if (!existing)
            throw new common_1.NotFoundException('Product not in wishlist');
        return this.prisma.wishlist.delete({
            where: {
                user_id_product_id: { user_id: userId, product_id: productId },
            },
        });
    }
};
exports.WishlistService = WishlistService;
exports.WishlistService = WishlistService = WishlistService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], WishlistService);
//# sourceMappingURL=wishlist.service.js.map