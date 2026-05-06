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
var InventoryService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../../shared/database/prisma.service.js");
let InventoryService = InventoryService_1 = class InventoryService {
    prisma;
    logger = new common_1.Logger(InventoryService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getStock(variantId) {
        this.logger.log(`Checking stock for Variant ID: ${variantId}`);
        const variant = await this.prisma.productVariant.findUnique({
            where: { id: variantId },
        });
        if (!variant)
            throw new common_1.NotFoundException('Variant not found');
        return { stock: variant.stock };
    }
    async updateStock(variantId, quantityChange) {
        this.logger.log(`Updating stock for Variant ID: ${variantId} (Change: ${quantityChange})`);
        const variant = await this.prisma.productVariant.update({
            where: { id: variantId },
            data: {
                stock: { increment: quantityChange },
            },
        });
        return variant;
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = InventoryService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map