"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var OrderSchedulerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchedulerService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_js_1 = require("../../shared/database/prisma.service.js");
const kommerce_service_js_1 = require("../../external/kommerce/kommerce.service.js");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let OrderSchedulerService = OrderSchedulerService_1 = class OrderSchedulerService {
    prisma;
    kommerceService;
    logger = new common_1.Logger(OrderSchedulerService_1.name);
    constructor(prisma, kommerceService) {
        this.prisma = prisma;
        this.kommerceService = kommerceService;
    }
    async handlePaymentSync() {
        if (!(await this.acquireLock('payment-sync', 4 * 60 * 1000))) {
            return;
        }
        this.logger.log('--- START: Automatic Payment Sync (Master Instance) ---');
        await new Promise(resolve => setTimeout(resolve, 5000));
        try {
            let pendingPayments = [];
            let querySuccess = false;
            let queryAttempt = 1;
            const maxQueryAttempts = 3;
            while (!querySuccess && queryAttempt <= maxQueryAttempts) {
                try {
                    pendingPayments = await this.prisma.payment.findMany({
                        where: {
                            status: 'pending',
                            payment_id: { not: null }
                        }
                    });
                    querySuccess = true;
                }
                catch (err) {
                    if (err.message.includes('pool timeout') && queryAttempt < maxQueryAttempts) {
                        this.logger.warn(`Database pool timeout on findMany (Attempt ${queryAttempt}/${maxQueryAttempts}). Retrying in 5s...`);
                        await new Promise(resolve => setTimeout(resolve, 5000));
                        queryAttempt++;
                    }
                    else {
                        throw err;
                    }
                }
            }
            if (pendingPayments.length === 0) {
                this.logger.log('No pending payments to sync.');
                return;
            }
            this.logger.log(`Found ${pendingPayments.length} pending payments. Syncing with rate limit...`);
            for (const payment of pendingPayments) {
                await this.syncWithRetry(payment.payment_id);
                await new Promise(resolve => setTimeout(resolve, 3000));
            }
            this.logger.log('--- END: Automatic Payment Sync ---');
        }
        catch (error) {
            this.logger.error('Error in handlePaymentSync cron job:', error);
        }
    }
    async syncWithRetry(paymentId, attempt = 1) {
        const maxAttempts = 3;
        try {
            this.logger.debug(`Attempt ${attempt}: Syncing Payment ${paymentId}`);
            await this.kommerceService.getPaymentStatus(paymentId);
        }
        catch (error) {
            if (attempt < maxAttempts) {
                const backoffMs = Math.pow(2, attempt) * 1000;
                this.logger.warn(`Failed to sync ${paymentId}. Retrying in ${backoffMs}ms... (Error: ${error.message})`);
                await new Promise(resolve => setTimeout(resolve, backoffMs));
                return this.syncWithRetry(paymentId, attempt + 1);
            }
            else {
                this.logger.error(`Max retries reached for payment ${paymentId}. Skipping.`);
            }
        }
    }
    async handleExpiredOrders() {
        if (!(await this.acquireLock('expired-orders', 55 * 60 * 1000))) {
            return;
        }
        this.logger.log('--- START: Checking Expired Orders (Master Instance) ---');
        const oneDayAgo = new Date();
        oneDayAgo.setHours(oneDayAgo.getHours() - 24);
        try {
            const expiredOrders = await this.prisma.order.findMany({
                where: {
                    status: 'pending',
                    order_date: { lt: oneDayAgo }
                },
                include: { items: true }
            });
            if (expiredOrders.length === 0) {
                this.logger.log('No expired orders found.');
                return;
            }
            this.logger.log(`Cancelling ${expiredOrders.length} expired orders...`);
            for (const order of expiredOrders) {
                await this.prisma.$transaction(async (tx) => {
                    await tx.order.update({
                        where: { id: order.id },
                        data: { status: 'cancelled' }
                    });
                    await tx.payment.updateMany({
                        where: { order_id: order.id },
                        data: { status: 'canceled' }
                    });
                    for (const item of order.items) {
                        if (item.product_variant_id && item.qty) {
                            await tx.productVariant.update({
                                where: { id: item.product_variant_id },
                                data: { stock: { increment: item.qty } }
                            });
                        }
                    }
                });
                this.logger.log(`Order ${order.id} has been automatically cancelled due to expiration.`);
            }
            this.logger.log('--- END: Checking Expired Orders ---');
        }
        catch (error) {
            this.logger.error('Error in handleExpiredOrders cron job:', error);
        }
    }
    async acquireLock(taskName, ttlMs) {
        const lockDir = path.join(process.cwd(), 'storage', 'locks');
        if (!fs.existsSync(lockDir)) {
            fs.mkdirSync(lockDir, { recursive: true });
        }
        const lockFile = path.join(lockDir, `${taskName}.lock`);
        const now = Date.now();
        try {
            if (fs.existsSync(lockFile)) {
                const lockInfo = JSON.parse(fs.readFileSync(lockFile, 'utf8'));
                if (now < lockInfo.expiry) {
                    return false;
                }
            }
            const lockData = {
                pid: process.pid,
                expiry: now + ttlMs,
            };
            fs.writeFileSync(lockFile, JSON.stringify(lockData));
            return true;
        }
        catch (e) {
            this.logger.error(`Failed to acquire lock for ${taskName}: ${e.message}`);
            return false;
        }
    }
};
exports.OrderSchedulerService = OrderSchedulerService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_5_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderSchedulerService.prototype, "handlePaymentSync", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderSchedulerService.prototype, "handleExpiredOrders", null);
exports.OrderSchedulerService = OrderSchedulerService = OrderSchedulerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService,
        kommerce_service_js_1.KommerceService])
], OrderSchedulerService);
//# sourceMappingURL=order-scheduler.service.js.map