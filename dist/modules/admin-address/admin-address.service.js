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
var AdminAddressService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAddressService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../../shared/database/prisma.service.js");
let AdminAddressService = AdminAddressService_1 = class AdminAddressService {
    prisma;
    logger = new common_1.Logger(AdminAddressService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createAdminAddressDto) {
        this.logger.log(`Creating admin address with label: ${createAdminAddressDto.label}`);
        return this.prisma.adminAddress.create({
            data: createAdminAddressDto,
        });
    }
    async findAll() {
        this.logger.log('Fetching all admin addresses');
        return this.prisma.adminAddress.findMany({
            orderBy: { created_at: 'desc' },
        });
    }
    async findOne(id) {
        this.logger.log(`Fetching admin address with id: ${id}`);
        const address = await this.prisma.adminAddress.findUnique({
            where: { id },
        });
        if (!address) {
            throw new common_1.NotFoundException(`Admin address with ID ${id} not found`);
        }
        return address;
    }
    async update(id, updateAdminAddressDto) {
        this.logger.log(`Updating admin address with id: ${id}`);
        await this.findOne(id);
        return this.prisma.adminAddress.update({
            where: { id },
            data: updateAdminAddressDto,
        });
    }
    async remove(id) {
        this.logger.log(`Deleting admin address with id: ${id}`);
        await this.findOne(id);
        return this.prisma.adminAddress.delete({
            where: { id },
        });
    }
};
exports.AdminAddressService = AdminAddressService;
exports.AdminAddressService = AdminAddressService = AdminAddressService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], AdminAddressService);
//# sourceMappingURL=admin-address.service.js.map