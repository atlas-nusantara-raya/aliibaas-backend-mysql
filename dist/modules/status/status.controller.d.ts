import { StatusService } from './status.service.js';
import { PaginationDto } from '../../shared/dto/pagination.dto.js';
export declare class StatusController {
    private readonly statusService;
    constructor(statusService: StatusService);
    findAll(pagination: PaginationDto): Promise<{
        id: number;
        name: string | null;
        description: string | null;
        is_active: number | null;
        code: string | null;
        type_status: string | null;
    }[]>;
    findByType(type: string, pagination: PaginationDto): Promise<{
        id: number;
        name: string | null;
        description: string | null;
        is_active: number | null;
        code: string | null;
        type_status: string | null;
    }[]>;
}
