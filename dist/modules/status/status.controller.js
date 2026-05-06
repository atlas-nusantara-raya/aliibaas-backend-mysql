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
exports.StatusController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const status_service_js_1 = require("./status.service.js");
const pagination_dto_js_1 = require("../../shared/dto/pagination.dto.js");
let StatusController = class StatusController {
    statusService;
    constructor(statusService) {
        this.statusService = statusService;
    }
    async findAll(pagination) {
        return this.statusService.findAll(pagination.limit, pagination.offset);
    }
    async findByType(type, pagination) {
        return this.statusService.findByType(type, pagination.limit, pagination.offset);
    }
};
exports.StatusController = StatusController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Ambil semua master status yang aktif dengan pagination' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_js_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], StatusController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('type/:type'),
    (0, swagger_1.ApiOperation)({ summary: 'Ambil master status berdasarkan tipe status dengan pagination' }),
    (0, swagger_1.ApiParam)({ name: 'type', description: 'Tipe status (misal: ORDER, PAYMENT, SHIPMENT)', example: 'ORDER' }),
    __param(0, (0, common_1.Param)('type')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pagination_dto_js_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], StatusController.prototype, "findByType", null);
exports.StatusController = StatusController = __decorate([
    (0, swagger_1.ApiTags)('Admin - Status'),
    (0, common_1.Controller)('status'),
    __metadata("design:paramtypes", [status_service_js_1.StatusService])
], StatusController);
//# sourceMappingURL=status.controller.js.map