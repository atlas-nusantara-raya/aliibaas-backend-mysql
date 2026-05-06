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
var ColorService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../../shared/database/prisma.service.js");
let ColorService = ColorService_1 = class ColorService {
    prisma;
    logger = new common_1.Logger(ColorService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(limit = 10, offset = 0) {
        this.logger.log(`Fetching all colors (limit: ${limit}, offset: ${offset})`);
        return this.prisma.mtColor.findMany({
            take: limit,
            skip: offset,
            orderBy: { name: 'asc' },
        });
    }
    async findOne(id) {
        this.logger.log(`Fetching color ID: ${id}`);
        const color = await this.prisma.mtColor.findUnique({
            where: { id },
        });
        if (!color)
            throw new common_1.NotFoundException('Color not found');
        return color;
    }
    async create(dto) {
        this.logger.log(`Creating new color: ${dto.name}`);
        return this.prisma.mtColor.create({
            data: {
                name: dto.name,
            },
        });
    }
    async update(id, dto) {
        this.logger.log(`Updating color ID: ${id}`);
        await this.findOne(id);
        return this.prisma.mtColor.update({
            where: { id },
            data: {
                name: dto.name,
            },
        });
    }
    async remove(id) {
        this.logger.log(`Deleting color ID: ${id}`);
        await this.findOne(id);
        return this.prisma.mtColor.delete({
            where: { id },
        });
    }
};
exports.ColorService = ColorService;
exports.ColorService = ColorService = ColorService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], ColorService);
//# sourceMappingURL=color.service.js.map