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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const throttler_1 = require("@nestjs/throttler");
const order_service_js_1 = require("./order.service.js");
const jwt_auth_guard_js_1 = require("../auth/jwt-auth.guard.js");
const roles_guard_js_1 = require("../auth/roles.guard.js");
const roles_decorator_js_1 = require("../auth/roles.decorator.js");
const role_enum_js_1 = require("../auth/role.enum.js");
const create_order_dto_js_1 = require("./dto/create-order.dto.js");
const checkout_dto_js_1 = require("./dto/checkout.dto.js");
const pagination_dto_js_1 = require("../../shared/dto/pagination.dto.js");
const common_2 = require("@nestjs/common");
let OrderController = class OrderController {
    orderService;
    constructor(orderService) {
        this.orderService = orderService;
    }
    async checkout(req, checkoutDto) {
        const order = await this.orderService.checkout(req.user.userId, checkoutDto.cartId, checkoutDto.addressId, checkoutDto.paymentMethodCode, checkoutDto.courier, checkoutDto.courierService, checkoutDto.shippingCost, checkoutDto.idempotencyKey);
        await this.orderService.postCheckoutCleanup(req.user.userId);
        return order;
    }
    async getMyOrders(req, pagination) {
        return this.orderService.getMyOrders(req.user.userId, pagination.limit, pagination.offset);
    }
    async findAll(pagination) {
        return this.orderService.getAllOrders(pagination.limit, pagination.offset);
    }
    async updateStatus(id, updateOrderStatusDto) {
        return this.orderService.updateOrderStatus(id, updateOrderStatusDto.status);
    }
    async getPaymentDetails(id, req) {
        return this.orderService.getPaymentDetails(req.user.userId, id);
    }
    async updateTracking(id, dto) {
        return this.orderService.updateTrackingNumber(id, dto.trackingNumber, dto.courier);
    }
    async trackShipment(id, req) {
        return this.orderService.trackOrder(id, req.user.userId);
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.Post)('checkout'),
    (0, throttler_1.Throttle)({ checkout: { limit: 3, ttl: 60000 } }),
    (0, swagger_1.ApiOperation)({ summary: 'Checkout using current cart items' }),
    (0, swagger_1.ApiBody)({ type: checkout_dto_js_1.CheckoutDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Order created successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, checkout_dto_js_1.CheckoutDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "checkout", null);
__decorate([
    (0, common_1.Get)('my'),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user orders with pagination' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of user orders' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_2.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pagination_dto_js_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getMyOrders", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_js_1.Roles)(role_enum_js_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get all orders with pagination (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all orders' }),
    __param(0, (0, common_2.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_js_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, roles_decorator_js_1.Roles)(role_enum_js_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Update order status (Admin only)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Order ID' }),
    (0, swagger_1.ApiBody)({ type: create_order_dto_js_1.UpdateOrderStatusDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Order status updated' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_order_dto_js_1.UpdateOrderStatusDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Get)(':id/payment'),
    (0, swagger_1.ApiOperation)({ summary: 'Get payment details and QR code' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Order ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payment details' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getPaymentDetails", null);
__decorate([
    (0, common_1.Patch)(':id/tracking'),
    (0, roles_decorator_js_1.Roles)(role_enum_js_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Submit tracking number / No Resi (Admin only)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Order ID' }),
    (0, swagger_1.ApiBody)({ type: create_order_dto_js_1.UpdateTrackingDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Tracking number updated' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_order_dto_js_1.UpdateTrackingDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "updateTracking", null);
__decorate([
    (0, common_1.Get)(':id/tracking'),
    (0, swagger_1.ApiOperation)({ summary: 'Track shipment real-time via Kommerce API' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Order ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Real-time tracking data' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "trackShipment", null);
exports.OrderController = OrderController = __decorate([
    (0, swagger_1.ApiTags)('User - Order'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiSecurity)('x-app-secret'),
    (0, common_1.Controller)('orders'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    __metadata("design:paramtypes", [order_service_js_1.OrderService])
], OrderController);
//# sourceMappingURL=order.controller.js.map