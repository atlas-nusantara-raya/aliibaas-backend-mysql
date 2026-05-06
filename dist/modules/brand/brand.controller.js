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
exports.BrandController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const brand_service_js_1 = require("./brand.service.js");
const brand_dto_js_1 = require("./dto/brand.dto.js");
const pagination_dto_js_1 = require("../../shared/dto/pagination.dto.js");
const jwt_auth_guard_js_1 = require("../auth/jwt-auth.guard.js");
const roles_guard_js_1 = require("../auth/roles.guard.js");
const roles_decorator_js_1 = require("../auth/roles.decorator.js");
const role_enum_js_1 = require("../auth/role.enum.js");
let BrandController = class BrandController {
    brandService;
    constructor(brandService) {
        this.brandService = brandService;
    }
    findAll(pagination) {
        return this.brandService.findAll(pagination.limit, pagination.offset);
    }
    findOne(id) {
        return this.brandService.findOne(id);
    }
    findProducts(id, pagination) {
        return this.brandService.findProductsByBrand(id, pagination.limit, pagination.offset);
    }
    create(dto) {
        return this.brandService.create(dto);
    }
    update(id, dto) {
        return this.brandService.update(id, dto);
    }
    remove(id) {
        return this.brandService.remove(id);
    }
};
exports.BrandController = BrandController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all brands' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all brands.' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_js_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], BrandController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get brand by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return a single brand.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Brand not found.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BrandController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/products'),
    (0, swagger_1.ApiOperation)({ summary: 'Get products by brand ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return products for this brand.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, pagination_dto_js_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], BrandController.prototype, "findProducts", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)(role_enum_js_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new brand (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Brand created.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [brand_dto_js_1.CreateBrandDto]),
    __metadata("design:returntype", void 0)
], BrandController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)(role_enum_js_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update a brand (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Brand updated.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, brand_dto_js_1.UpdateBrandDto]),
    __metadata("design:returntype", void 0)
], BrandController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)(role_enum_js_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a brand (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Brand deleted.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BrandController.prototype, "remove", null);
exports.BrandController = BrandController = __decorate([
    (0, swagger_1.ApiTags)('Admin - Brand'),
    (0, swagger_1.ApiSecurity)('x-app-secret'),
    (0, common_1.Controller)('brands'),
    __metadata("design:paramtypes", [brand_service_js_1.BrandService])
], BrandController);
//# sourceMappingURL=brand.controller.js.map