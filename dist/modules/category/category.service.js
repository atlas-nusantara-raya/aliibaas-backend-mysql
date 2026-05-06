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
var CategoryService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../../shared/database/prisma.service.js");
let CategoryService = CategoryService_1 = class CategoryService {
    prisma;
    logger = new common_1.Logger(CategoryService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(limit = 10, offset = 0) {
        this.logger.log(`Fetching all categories (limit: ${limit}, offset: ${offset})`);
        return this.prisma.mtCategory.findMany({
            take: limit,
            skip: offset,
            orderBy: { display_order: 'asc' },
        });
    }
    async findOne(id) {
        this.logger.log(`Fetching category ID: ${id}`);
        const category = await this.prisma.mtCategory.findUnique({
            where: { id },
        });
        if (!category)
            throw new common_1.NotFoundException('Category not found');
        return category;
    }
    async create(dto) {
        this.logger.log(`Creating new category: ${dto.name}`);
        return this.prisma.mtCategory.create({
            data: {
                name: dto.name,
                display_order: dto.displayOrder,
            },
        });
    }
    async update(id, dto) {
        this.logger.log(`Updating category ID: ${id}`);
        await this.findOne(id);
        return this.prisma.mtCategory.update({
            where: { id },
            data: {
                name: dto.name,
                display_order: dto.displayOrder,
            },
        });
    }
    async remove(id) {
        this.logger.log(`Deleting category ID: ${id}`);
        await this.findOne(id);
        return this.prisma.mtCategory.delete({
            where: { id },
        });
    }
    async findProductsByCategory(categoryId, limit = 10, offset = 0) {
        this.logger.log(`Fetching products for category ID: ${categoryId}`);
        await this.findOne(categoryId);
        return this.prisma.product.findMany({
            where: { category_id: categoryId, is_active: 1 },
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
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = CategoryService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], CategoryService);
//# sourceMappingURL=category.service.js.map