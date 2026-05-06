import { ColorService } from './color.service.js';
import { CreateColorDto, UpdateColorDto } from './dto/color.dto.js';
import { PaginationDto } from '../../shared/dto/pagination.dto.js';
export declare class ColorController {
    private readonly colorService;
    constructor(colorService: ColorService);
    findAll(pagination: PaginationDto): Promise<{
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
