import { SizeService } from './size.service.js';
import { CreateSizeDto, UpdateSizeDto } from './dto/size.dto.js';
import { PaginationDto } from '../../shared/dto/pagination.dto.js';
export declare class SizeController {
    private readonly sizeService;
    constructor(sizeService: SizeService);
    findAll(pagination: PaginationDto): Promise<{
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
