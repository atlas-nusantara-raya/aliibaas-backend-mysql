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
exports.AddressController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_js_1 = require("../auth/jwt-auth.guard.js");
const address_service_js_1 = require("./address.service.js");
const address_dto_js_1 = require("./dto/address.dto.js");
const pagination_dto_js_1 = require("../../shared/dto/pagination.dto.js");
const common_2 = require("@nestjs/common");
let AddressController = class AddressController {
    addressService;
    constructor(addressService) {
        this.addressService = addressService;
    }
    create(req, createAddressDto) {
        return this.addressService.create(req.user.userId, createAddressDto);
    }
    findAll(req, pagination) {
        return this.addressService.findAll(req.user.userId, pagination.limit, pagination.offset);
    }
    findByUserId(userId) {
        return this.addressService.findAll(userId);
    }
    update(req, id, updateAddressDto) {
        return this.addressService.update(req.user.userId, id, updateAddressDto);
    }
    remove(req, id) {
        return this.addressService.remove(req.user.userId, id);
    }
    setDefault(req, id) {
        return this.addressService.setDefault(req.user.userId, id);
    }
};
exports.AddressController = AddressController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new user address' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Address created successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, address_dto_js_1.CreateAddressDto]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all user addresses with pagination' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of user addresses' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_2.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pagination_dto_js_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all addresses for a specific user ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of user addresses' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "findByUserId", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an address' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Address updated' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, address_dto_js_1.UpdateAddressDto]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an address' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Address deleted' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/default'),
    (0, swagger_1.ApiOperation)({ summary: 'Set an address as default' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Default address updated' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "setDefault", null);
exports.AddressController = AddressController = __decorate([
    (0, swagger_1.ApiTags)('User - Address'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiSecurity)('x-app-secret'),
    (0, common_1.Controller)('addresses'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard),
    __metadata("design:paramtypes", [address_service_js_1.AddressService])
], AddressController);
//# sourceMappingURL=address.controller.js.map