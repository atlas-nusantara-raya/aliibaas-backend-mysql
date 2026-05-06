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
var KommerceController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KommerceController = void 0;
const common_1 = require("@nestjs/common");
const kommerce_service_js_1 = require("./kommerce.service.js");
const swagger_1 = require("@nestjs/swagger");
const prisma_service_js_1 = require("../../shared/database/prisma.service.js");
const calculate_cost_dto_js_1 = require("./dto/calculate-cost.dto.js");
const kommerce_dto_js_1 = require("./dto/kommerce.dto.js");
let KommerceController = KommerceController_1 = class KommerceController {
    kommerceService;
    prisma;
    logger = new common_1.Logger(KommerceController_1.name);
    constructor(kommerceService, prisma) {
        this.kommerceService = kommerceService;
        this.prisma = prisma;
    }
    async getMethods() {
        return this.kommerceService.getPaymentMethods();
    }
    async getStatus(id) {
        return this.kommerceService.getPaymentStatus(id);
    }
    async createPayment(dto) {
        return this.kommerceService.createPayment(dto);
    }
    async cancelPayment(dto) {
        return this.kommerceService.cancelPayment(dto);
    }
    async handleCallback(body, callbackKey) {
        return this.kommerceService.handleCallback(body, callbackKey);
    }
    async getProvinces() {
        return await this.kommerceService.getProvinces();
    }
    async getCities(provinceId) {
        return await this.kommerceService.getCities(provinceId);
    }
    async getDistricts(cityId) {
        return await this.kommerceService.getDistricts(cityId);
    }
    async getSubdistricts(districtId) {
        return await this.kommerceService.getSubdistricts(districtId);
    }
    async getCost(dto) {
        return await this.kommerceService.calculateCost(dto.origin, dto.destination, dto.weight, dto.courier, dto.price);
    }
};
exports.KommerceController = KommerceController;
__decorate([
    (0, common_1.Get)('methods'),
    (0, swagger_1.ApiOperation)({ summary: 'Get available payment methods' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], KommerceController.prototype, "getMethods", null);
__decorate([
    (0, common_1.Get)('payment/status/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Check payment status' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], KommerceController.prototype, "getStatus", null);
__decorate([
    (0, common_1.Post)('payment/create'),
    (0, swagger_1.ApiOperation)({ summary: 'Create manual payment for testing' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [kommerce_dto_js_1.CreateKommercePaymentDto]),
    __metadata("design:returntype", Promise)
], KommerceController.prototype, "createPayment", null);
__decorate([
    (0, common_1.Post)('payment/cancel'),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel a pending payment' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [kommerce_dto_js_1.CancelKommercePaymentDto]),
    __metadata("design:returntype", Promise)
], KommerceController.prototype, "cancelPayment", null);
__decorate([
    (0, common_1.Post)('callback'),
    (0, swagger_1.ApiOperation)({ summary: 'Callback webhook from Kommerce' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('x-callback-key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], KommerceController.prototype, "handleCallback", null);
__decorate([
    (0, common_1.Get)('provinces'),
    (0, swagger_1.ApiOperation)({ summary: 'Get list of provinces' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], KommerceController.prototype, "getProvinces", null);
__decorate([
    (0, common_1.Get)('cities'),
    (0, swagger_1.ApiOperation)({ summary: 'Get list of cities' }),
    (0, swagger_1.ApiQuery)({ name: 'provinceId', required: false, description: 'Filter by province ID' }),
    __param(0, (0, common_1.Query)('provinceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], KommerceController.prototype, "getCities", null);
__decorate([
    (0, common_1.Get)('districts/:cityId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get list of districts (Kecamatan) by city ID' }),
    __param(0, (0, common_1.Param)('cityId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], KommerceController.prototype, "getDistricts", null);
__decorate([
    (0, common_1.Get)('sub-districts/:districtId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get list of sub-districts (Kelurahan) by district ID' }),
    __param(0, (0, common_1.Param)('districtId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], KommerceController.prototype, "getSubdistricts", null);
__decorate([
    (0, common_1.Post)('cost'),
    (0, swagger_1.ApiOperation)({ summary: 'Calculate shipping cost (Real-time)' }),
    (0, swagger_1.ApiBody)({ type: calculate_cost_dto_js_1.CalculateCostDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [calculate_cost_dto_js_1.CalculateCostDto]),
    __metadata("design:returntype", Promise)
], KommerceController.prototype, "getCost", null);
exports.KommerceController = KommerceController = KommerceController_1 = __decorate([
    (0, swagger_1.ApiTags)('Admin - Shipping (Kommerce)'),
    (0, common_1.Controller)('external/kommerce'),
    __metadata("design:paramtypes", [kommerce_service_js_1.KommerceService,
        prisma_service_js_1.PrismaService])
], KommerceController);
//# sourceMappingURL=kommerce.controller.js.map