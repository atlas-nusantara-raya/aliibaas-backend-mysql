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
var SizeService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SizeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../../shared/database/prisma.service.js");
let SizeService = SizeService_1 = class SizeService {
    prisma;
    logger = new common_1.Logger(SizeService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(limit = 10, offset = 0) {
        this.logger.log(`Fetching all sizes (limit: ${limit}, offset: ${offset})`);
        return this.prisma.mtSize.findMany({
            take: limit,
            skip: offset,
            orderBy: { name: 'asc' },
        });
    }
    async findOne(id) {
        this.logger.log(`Fetching size ID: ${id}`);
        const size = await this.prisma.mtSize.findUnique({
            where: { id },
        });
        if (!size)
            throw new common_1.NotFoundException('Size not found');
        return size;
    }
    async create(dto) {
        this.logger.log(`Creating new size: ${dto.name}`);
        return this.prisma.mtSize.create({
            data: {
                name: dto.name,
                description: dto.description,
            },
        });
    }
    async update(id, dto) {
        this.logger.log(`Updating size ID: ${id}`);
        await this.findOne(id);
        return this.prisma.mtSize.update({
            where: { id },
            data: {
                name: dto.name,
                description: dto.description,
            },
        });
    }
    async remove(id) {
        this.logger.log(`Deleting size ID: ${id}`);
        await this.findOne(id);
        return this.prisma.mtSize.delete({
            where: { id },
        });
    }
};
exports.SizeService = SizeService;
exports.SizeService = SizeService = SizeService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], SizeService);
//# sourceMappingURL=size.service.js.map