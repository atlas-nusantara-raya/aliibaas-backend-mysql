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
var AddressService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../../shared/database/prisma.service.js");
let AddressService = AddressService_1 = class AddressService {
    prisma;
    logger = new common_1.Logger(AddressService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(userId, limit = 10, offset = 0) {
        this.logger.log(`Fetching all addresses for User ID: ${userId}`);
        return this.prisma.userAddress.findMany({
            where: { user_id: userId },
            take: limit,
            skip: offset,
            orderBy: { is_default: 'desc' },
        });
    }
    async findOne(userId, id) {
        this.logger.log(`Fetching address ID: ${id} for User ID: ${userId}`);
        const address = await this.prisma.userAddress.findUnique({
            where: { id },
        });
        if (!address || address.user_id !== userId) {
            throw new common_1.NotFoundException('Address not found');
        }
        return address;
    }
    async create(userId, dto) {
        this.logger.log(`Creating new address for User ID: ${userId} (${dto.label})`);
        const addressCount = await this.prisma.userAddress.count({
            where: { user_id: userId },
        });
        const shouldBeDefault = addressCount === 0 || dto.isDefault === 1;
        if (shouldBeDefault) {
            await this.unsetDefaults(userId);
        }
        return this.prisma.userAddress.create({
            data: {
                user_id: userId,
                label: dto.label,
                recipient_name: dto.recipientName,
                phone: dto.phone,
                address: dto.address,
                province_id: dto.provinceId,
                province_name: dto.provinceName,
                city_id: dto.cityId,
                city_name: dto.cityName,
                district_id: dto.districtId,
                district_name: dto.districtName,
                postal_code: dto.postalCode,
                is_default: shouldBeDefault ? 1 : 0,
            },
        });
    }
    async update(userId, id, dto) {
        this.logger.log(`Updating address ID: ${id} for User ID: ${userId}`);
        await this.findOne(userId, id);
        if (dto.isDefault === 1) {
            await this.unsetDefaults(userId);
        }
        return this.prisma.userAddress.update({
            where: { id },
            data: {
                label: dto.label,
                recipient_name: dto.recipientName,
                phone: dto.phone,
                address: dto.address,
                province_id: dto.provinceId,
                province_name: dto.provinceName,
                city_id: dto.cityId,
                city_name: dto.cityName,
                district_id: dto.districtId,
                district_name: dto.districtName,
                postal_code: dto.postalCode,
                is_default: dto.isDefault,
            },
        });
    }
    async remove(userId, id) {
        this.logger.log(`Removing address ID: ${id} for User ID: ${userId}`);
        await this.findOne(userId, id);
        await this.prisma.userAddress.delete({ where: { id } });
        return { success: true };
    }
    async setDefault(userId, id) {
        this.logger.log(`Setting address ID: ${id} as default for User ID: ${userId}`);
        await this.findOne(userId, id);
        await this.unsetDefaults(userId);
        return this.prisma.userAddress.update({
            where: { id },
            data: { is_default: 1 },
        });
    }
    async unsetDefaults(userId) {
        await this.prisma.userAddress.updateMany({
            where: { user_id: userId, is_default: 1 },
            data: { is_default: 0 },
        });
    }
};
exports.AddressService = AddressService;
exports.AddressService = AddressService = AddressService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], AddressService);
//# sourceMappingURL=address.service.js.map