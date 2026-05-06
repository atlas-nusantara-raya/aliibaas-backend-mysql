import { PrismaService } from '../../shared/database/prisma.service.js';
export declare class NotificationService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    createNotification(userId: string, title: string, message: string): Promise<{
        id: number;
        created_at: Date;
        user_id: string | null;
        title: string | null;
        message: string | null;
        is_read: number | null;
    }>;
    getMyNotifications(userId: string, limit?: number, offset?: number): Promise<{
        id: number;
        created_at: Date;
        user_id: string | null;
        title: string | null;
        message: string | null;
        is_read: number | null;
    }[]>;
    markAsRead(notificationId: number, userId: string): Promise<import("@prisma/client").Prisma.BatchPayload>;
    markAllAsRead(userId: string): Promise<import("@prisma/client").Prisma.BatchPayload>;
    deleteOldNotifications(days?: number): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
