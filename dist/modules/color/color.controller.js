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
exports.ColorController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const color_service_js_1 = require("./color.service.js");
const color_dto_js_1 = require("./dto/color.dto.js");
const pagination_dto_js_1 = require("../../shared/dto/pagination.dto.js");
const jwt_auth_guard_js_1 = require("../auth/jwt-auth.guard.js");
const roles_guard_js_1 = require("../auth/roles.guard.js");
const roles_decorator_js_1 = require("../auth/roles.decorator.js");
const role_enum_js_1 = require("../auth/role.enum.js");
let ColorController = class ColorController {
    colorService;
    constructor(colorService) {
        this.colorService = colorService;
    }
    findAll(pagination) {
        return this.colorService.findAll(pagination.limit, pagination.offset);
    }
    findOne(id) {
        return this.colorService.findOne(id);
    }
    create(dto) {
        return this.colorService.create(dto);
    }
    update(id, dto) {
        return this.colorService.update(id, dto);
    }
    remove(id) {
        return this.colorService.remove(id);
    }
};
exports.ColorController = ColorController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all colors' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all colors.' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_js_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], ColorController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get color by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return a single color.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Color not found.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ColorController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)(role_enum_js_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new color (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Color created.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [color_dto_js_1.CreateColorDto]),
    __metadata("design:returntype", void 0)
], ColorController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)(role_enum_js_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update a color (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Color updated.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, color_dto_js_1.UpdateColorDto]),
    __metadata("design:returntype", void 0)
], ColorController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)(role_enum_js_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a color (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Color deleted.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ColorController.prototype, "remove", null);
exports.ColorController = ColorController = __decorate([
    (0, swagger_1.ApiTags)('Admin - Color'),
    (0, swagger_1.ApiSecurity)('x-app-secret'),
    (0, common_1.Controller)('colors'),
    __metadata("design:paramtypes", [color_service_js_1.ColorService])
], ColorController);
//# sourceMappingURL=color.controller.js.map