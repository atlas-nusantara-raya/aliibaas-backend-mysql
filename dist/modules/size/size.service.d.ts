import { PrismaService } from '../../shared/database/prisma.service.js';
import { CreateSizeDto, UpdateSizeDto } from './dto/size.dto.js';
export declare class SizeService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    findAll(limit?: number, offset?: number): Promise<{
        id: number;
        name: string | null;
        description: string | null;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        name: string | null;
        description: string | null;
    }>;
    create(dto: CreateSizeDto): Promise<{
        id: number;
        name: string | null;
        description: string | null;
    }>;
    update(id: number, dto: UpdateSizeDto): Promise<{
        id: number;
        name: string | null;
        description: string | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string | null;
        description: string | null;
    }>;
}
