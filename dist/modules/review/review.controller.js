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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_js_1 = require("../auth/jwt-auth.guard.js");
const review_service_js_1 = require("./review.service.js");
const create_review_dto_js_1 = require("./dto/create-review.dto.js");
const pagination_dto_js_1 = require("../../shared/dto/pagination.dto.js");
const common_2 = require("@nestjs/common");
let ReviewController = class ReviewController {
    reviewService;
    constructor(reviewService) {
        this.reviewService = reviewService;
    }
    create(req, createReviewDto) {
        return this.reviewService.create(req.user.userId, createReviewDto);
    }
    findByProduct(productId, pagination) {
        return this.reviewService.findByProduct(productId, pagination.limit, pagination.offset);
    }
    getMyReviews(req, pagination) {
        return this.reviewService.getMyReviews(req.user.userId, pagination.limit, pagination.offset);
    }
};
exports.ReviewController = ReviewController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Submit a product review' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Review submitted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - User must have purchased the product' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_review_dto_js_1.CreateReviewDto]),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('product/:productId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get reviews for a product with pagination' }),
    (0, swagger_1.ApiParam)({ name: 'productId', description: 'Product ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of reviews' }),
    __param(0, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __param(1, (0, common_2.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, pagination_dto_js_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "findByProduct", null);
__decorate([
    (0, common_1.Get)('my'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get my reviews with pagination' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of my reviews' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_2.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pagination_dto_js_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "getMyReviews", null);
exports.ReviewController = ReviewController = __decorate([
    (0, swagger_1.ApiTags)('User - Review'),
    (0, swagger_1.ApiSecurity)('x-app-secret'),
    (0, common_1.Controller)('reviews'),
    __metadata("design:paramtypes", [review_service_js_1.ReviewService])
], ReviewController);
//# sourceMappingURL=review.controller.js.map