import { KommerceService } from './kommerce.service.js';
import { PrismaService } from '../../shared/database/prisma.service.js';
import { CalculateCostDto } from './dto/calculate-cost.dto.js';
import { CreateKommercePaymentDto, CancelKommercePaymentDto } from './dto/kommerce.dto.js';
export declare class KommerceController {
    private readonly kommerceService;
    private readonly prisma;
    private readonly logger;
    constructor(kommerceService: KommerceService, prisma: PrismaService);
    getMethods(): Promise<import("./dto/kommerce.dto.js").KommerceResponse<any>>;
    getStatus(id: string): Promise<import("./dto/kommerce.dto.js").KommerceResponse<import("./dto/kommerce.dto.js").KommercePaymentData>>;
    createPayment(dto: CreateKommercePaymentDto): Promise<import("./dto/kommerce.dto.js").KommerceResponse<import("./dto/kommerce.dto.js").KommercePaymentData>>;
    cancelPayment(dto: CancelKommercePaymentDto): Promise<import("./dto/kommerce.dto.js").KommerceResponse<any>>;
    handleCallback(body: any, callbackKey: string): Promise<{
        success: boolean;
        message: string;
    } | {
        success: boolean;
        message?: undefined;
    }>;
    getProvinces(): Promise<any>;
    getCities(provinceId?: string): Promise<any>;
    getDistricts(cityId: string): Promise<any>;
    getSubdistricts(districtId: string): Promise<any>;
    getCost(dto: CalculateCostDto): Promise<any>;
}
