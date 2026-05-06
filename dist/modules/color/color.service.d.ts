import { PrismaService } from '../../shared/database/prisma.service.js';
import { CreateColorDto, UpdateColorDto } from './dto/color.dto.js';
export declare class ColorService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    findAll(limit?: number, offset?: number): Promise<{
        id: number;
        name: string | null;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        name: string | null;
    }>;
    create(dto: CreateColorDto): Promise<{
        id: number;
        name: string | null;
    }>;
    update(id: number, dto: UpdateColorDto): Promise<{
        id: number;
        name: string | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string | null;
    }>;
}
