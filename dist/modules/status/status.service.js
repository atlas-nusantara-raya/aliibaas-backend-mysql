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
var StatusService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../../shared/database/prisma.service.js");
let StatusService = StatusService_1 = class StatusService {
    prisma;
    logger = new common_1.Logger(StatusService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(limit = 10, offset = 0) {
        this.logger.log(`Fetching all active statuses (limit: ${limit}, offset: ${offset})`);
        return this.prisma.mtStatus.findMany({
            where: {
                is_active: 1,
            },
            take: limit,
            skip: offset,
            orderBy: {
                id: 'asc',
            },
        });
    }
    async findByType(type, limit = 10, offset = 0) {
        this.logger.log(`Fetching statuses for type: ${type}`);
        return this.prisma.mtStatus.findMany({
            where: {
                type_status: type,
                is_active: 1,
            },
            take: limit,
            skip: offset,
            orderBy: {
                code: 'asc',
            },
        });
    }
};
exports.StatusService = StatusService;
exports.StatusService = StatusService = StatusService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], StatusService);
//# sourceMappingURL=status.service.js.map