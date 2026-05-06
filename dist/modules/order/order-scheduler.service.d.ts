import { PrismaService } from '../../shared/database/prisma.service.js';
import { KommerceService } from '../../external/kommerce/kommerce.service.js';
export declare class OrderSchedulerService {
    private readonly prisma;
    private readonly kommerceService;
    private readonly logger;
    constructor(prisma: PrismaService, kommerceService: KommerceService);
    handlePaymentSync(): Promise<void>;
    private syncWithRetry;
    handleExpiredOrders(): Promise<void>;
    private acquireLock;
}
