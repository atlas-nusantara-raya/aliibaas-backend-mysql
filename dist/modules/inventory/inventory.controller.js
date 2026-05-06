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
exports.InventoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const inventory_service_js_1 = require("./inventory.service.js");
const jwt_auth_guard_js_1 = require("../auth/jwt-auth.guard.js");
const roles_guard_js_1 = require("../auth/roles.guard.js");
const roles_decorator_js_1 = require("../auth/roles.decorator.js");
const role_enum_js_1 = require("../auth/role.enum.js");
const update_stock_dto_js_1 = require("./dto/update-stock.dto.js");
let InventoryController = class InventoryController {
    inventoryService;
    constructor(inventoryService) {
        this.inventoryService = inventoryService;
    }
    async getStock(variantId) {
        return this.inventoryService.getStock(variantId);
    }
    async updateStock(variantId, updateStockDto) {
        return this.inventoryService.updateStock(variantId, updateStockDto.quantityChange);
    }
};
exports.InventoryController = InventoryController;
__decorate([
    (0, common_1.Get)(':variantId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get variant stock level' }),
    (0, swagger_1.ApiParam)({ name: 'variantId', description: 'Variant ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Current stock level' }),
    __param(0, (0, common_1.Param)('variantId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "getStock", null);
__decorate([
    (0, common_1.Patch)(':variantId'),
    (0, roles_decorator_js_1.Roles)(role_enum_js_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Update variant stock level (Admin only)' }),
    (0, swagger_1.ApiParam)({ name: 'variantId', description: 'Variant ID' }),
    (0, swagger_1.ApiBody)({ type: update_stock_dto_js_1.UpdateStockDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Updated inventory' }),
    __param(0, (0, common_1.Param)('variantId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_stock_dto_js_1.UpdateStockDto]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "updateStock", null);
exports.InventoryController = InventoryController = __decorate([
    (0, swagger_1.ApiTags)('Admin - Inventory'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiSecurity)('x-app-secret'),
    (0, common_1.Controller)('inventory'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    __metadata("design:paramtypes", [inventory_service_js_1.InventoryService])
], InventoryController);
//# sourceMappingURL=inventory.controller.js.map