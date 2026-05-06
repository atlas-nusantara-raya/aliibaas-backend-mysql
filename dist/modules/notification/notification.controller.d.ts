import { NotificationService } from './notification.service.js';
import { PaginationDto } from '../../shared/dto/pagination.dto.js';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    getMyNotifications(req: any, pagination: PaginationDto): Promise<{
        id: number;
        created_at: Date;
        user_id: string | null;
        title: string | null;
        message: string | null;
        is_read: number | null;
    }[]>;
    markAsRead(id: number, req: any): Promise<import("@prisma/client").Prisma.BatchPayload>;
    markAllAsRead(req: any): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
