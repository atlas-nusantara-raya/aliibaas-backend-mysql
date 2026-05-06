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
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cart_service_js_1 = require("./cart.service.js");
const jwt_auth_guard_js_1 = require("../auth/jwt-auth.guard.js");
const add_item_dto_js_1 = require("./dto/add-item.dto.js");
let CartController = class CartController {
    cartService;
    constructor(cartService) {
        this.cartService = cartService;
    }
    async getCart(req) {
        return this.cartService.getCart(req.user.userId);
    }
    async addItem(req, addItemDto) {
        return this.cartService.addItem(req.user.userId, addItemDto.variantId, addItemDto.qty, addItemDto.cartId);
    }
    async incrementItem(req, cartId, variantId) {
        return this.cartService.incrementItem(req.user.userId, variantId, cartId);
    }
    async decrementItem(req, cartId, variantId) {
        return this.cartService.decrementItem(req.user.userId, variantId, cartId);
    }
    async removeItem(req, variantId) {
        return this.cartService.removeItem(req.user.userId, variantId);
    }
    async clearCart(req) {
        return this.cartService.clearCart(req.user.userId);
    }
};
exports.CartController = CartController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user cart' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return current cart details.' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "getCart", null);
__decorate([
    (0, common_1.Post)('items'),
    (0, swagger_1.ApiOperation)({ summary: 'Add or update item in cart (Overwrite mode)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Item quantity set successfully.' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_item_dto_js_1.AddItemDto]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "addItem", null);
__decorate([
    (0, common_1.Post)(':cartId/items/:variantId/increment'),
    (0, swagger_1.ApiOperation)({ summary: 'Increment item quantity (+1)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Item quantity incremented.' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('cartId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('variantId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "incrementItem", null);
__decorate([
    (0, common_1.Post)(':cartId/items/:variantId/decrement'),
    (0, swagger_1.ApiOperation)({ summary: 'Decrement item quantity (-1)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Item quantity decremented.' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('cartId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('variantId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "decrementItem", null);
__decorate([
    (0, common_1.Delete)('items/:variantId'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove item from cart' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Item removed successfully.' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('variantId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "removeItem", null);
__decorate([
    (0, common_1.Delete)(),
    (0, swagger_1.ApiOperation)({ summary: 'Clear entire cart' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cart cleared successfully.' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "clearCart", null);
exports.CartController = CartController = __decorate([
    (0, swagger_1.ApiTags)('User - Cart'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiSecurity)('x-app-secret'),
    (0, common_1.Controller)('cart'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard),
    __metadata("design:paramtypes", [cart_service_js_1.CartService])
], CartController);
//# sourceMappingURL=cart.controller.js.map