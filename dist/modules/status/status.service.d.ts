import { PrismaService } from '../../shared/database/prisma.service.js';
export declare class StatusService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    findAll(limit?: number, offset?: number): Promise<{
        id: number;
        name: string | null;
        description: string | null;
        is_active: number | null;
        code: string | null;
        type_status: string | null;
    }[]>;
    findByType(type: string, limit?: number, offset?: number): Promise<{
        id: number;
        name: string | null;
        description: string | null;
        is_active: number | null;
        code: string | null;
        type_status: string | null;
    }[]>;
}
