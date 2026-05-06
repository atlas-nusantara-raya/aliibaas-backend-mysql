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
var NotificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../../shared/database/prisma.service.js");
let NotificationService = NotificationService_1 = class NotificationService {
    prisma;
    logger = new common_1.Logger(NotificationService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createNotification(userId, title, message) {
        this.logger.log(`Creating notification for User: ${userId}`);
        return this.prisma.notification.create({
            data: {
                user_id: userId,
                title,
                message,
            },
        });
    }
    async getMyNotifications(userId, limit = 20, offset = 0) {
        return this.prisma.notification.findMany({
            where: { user_id: userId },
            orderBy: { created_at: 'desc' },
            take: limit,
            skip: offset,
        });
    }
    async markAsRead(notificationId, userId) {
        return this.prisma.notification.updateMany({
            where: { id: notificationId, user_id: userId },
            data: { is_read: 1 },
        });
    }
    async markAllAsRead(userId) {
        return this.prisma.notification.updateMany({
            where: { user_id: userId, is_read: 0 },
            data: { is_read: 1 },
        });
    }
    async deleteOldNotifications(days = 30) {
        const date = new Date();
        date.setDate(date.getDate() - days);
        return this.prisma.notification.deleteMany({
            where: { created_at: { lt: date } },
        });
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = NotificationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], NotificationService);
//# sourceMappingURL=notification.service.js.map