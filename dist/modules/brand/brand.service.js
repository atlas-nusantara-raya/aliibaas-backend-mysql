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
var BrandService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../../shared/database/prisma.service.js");
let BrandService = BrandService_1 = class BrandService {
    prisma;
    logger = new common_1.Logger(BrandService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(limit = 10, offset = 0) {
        this.logger.log(`Fetching all brands (limit: ${limit}, offset: ${offset})`);
        return this.prisma.mtBrand.findMany({
            take: limit,
            skip: offset,
            orderBy: { name: 'asc' },
        });
    }
    async findOne(id) {
        this.logger.log(`Fetching brand ID: ${id}`);
        const brand = await this.prisma.mtBrand.findUnique({
            where: { id },
        });
        if (!brand)
            throw new common_1.NotFoundException('Brand not found');
        return brand;
    }
    async create(dto) {
        this.logger.log(`Creating new brand: ${dto.name}`);
        return this.prisma.mtBrand.create({
            data: {
                name: dto.name,
                description: dto.description,
            },
        });
    }
    async update(id, dto) {
        this.logger.log(`Updating brand ID: ${id}`);
        await this.findOne(id);
        return this.prisma.mtBrand.update({
            where: { id },
            data: {
                name: dto.name,
                description: dto.description,
            },
        });
    }
    async remove(id) {
        this.logger.log(`Deleting brand ID: ${id}`);
        await this.findOne(id);
        return this.prisma.mtBrand.delete({
            where: { id },
        });
    }
    async findProductsByBrand(brandId, limit = 10, offset = 0) {
        this.logger.log(`Fetching products for brand ID: ${brandId}`);
        await this.findOne(brandId);
        return this.prisma.product.findMany({
            where: { brand_id: brandId, is_active: 1 },
            take: limit,
            skip: offset,
            include: {
                variants: true,
                category: true,
                brand: true,
                images: { where: { is_primary: 1 } },
            },
            orderBy: { created_at: 'desc' },
        });
    }
};
exports.BrandService = BrandService;
exports.BrandService = BrandService = BrandService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], BrandService);
//# sourceMappingURL=brand.service.js.map