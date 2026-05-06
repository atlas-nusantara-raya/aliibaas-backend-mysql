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
exports.SizeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const size_service_js_1 = require("./size.service.js");
const size_dto_js_1 = require("./dto/size.dto.js");
const pagination_dto_js_1 = require("../../shared/dto/pagination.dto.js");
const jwt_auth_guard_js_1 = require("../auth/jwt-auth.guard.js");
const roles_guard_js_1 = require("../auth/roles.guard.js");
const roles_decorator_js_1 = require("../auth/roles.decorator.js");
const role_enum_js_1 = require("../auth/role.enum.js");
let SizeController = class SizeController {
    sizeService;
    constructor(sizeService) {
        this.sizeService = sizeService;
    }
    findAll(pagination) {
        return this.sizeService.findAll(pagination.limit, pagination.offset);
    }
    findOne(id) {
        return this.sizeService.findOne(id);
    }
    create(dto) {
        return this.sizeService.create(dto);
    }
    update(id, dto) {
        return this.sizeService.update(id, dto);
    }
    remove(id) {
        return this.sizeService.remove(id);
    }
};
exports.SizeController = SizeController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all sizes' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all sizes.' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_js_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], SizeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get size by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return a single size.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Size not found.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SizeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)(role_enum_js_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new size (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Size created.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [size_dto_js_1.CreateSizeDto]),
    __metadata("design:returntype", void 0)
], SizeController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)(role_enum_js_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update a size (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Size updated.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, size_dto_js_1.UpdateSizeDto]),
    __metadata("design:returntype", void 0)
], SizeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)(role_enum_js_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a size (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Size deleted.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SizeController.prototype, "remove", null);
exports.SizeController = SizeController = __decorate([
    (0, swagger_1.ApiTags)('Admin - Size'),
    (0, swagger_1.ApiSecurity)('x-app-secret'),
    (0, common_1.Controller)('sizes'),
    __metadata("design:paramtypes", [size_service_js_1.SizeService])
], SizeController);
//# sourceMappingURL=size.controller.js.map