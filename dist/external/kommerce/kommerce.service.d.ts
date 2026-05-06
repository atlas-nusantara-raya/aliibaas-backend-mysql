import { CreateKommercePaymentDto, KommercePaymentData, KommerceResponse, CancelKommercePaymentDto } from './dto/kommerce.dto.js';
import { PrismaService } from '../../shared/database/prisma.service.js';
import { NotificationService } from '../../modules/notification/notification.service.js';
import { EmailService } from '../../shared/email/email.service.js';
export declare class KommerceService {
    private readonly prisma;
    private readonly notificationService;
    private readonly emailService;
    private readonly logger;
    private readonly shippingApiKey;
    private readonly paymentApiKey;
    private readonly collaboratorBaseUrl;
    private readonly shippingBaseUrl;
    private readonly callbackKey;
    private readonly callbackUrl;
    private readonly cacheDir;
    private readonly TTL_DAYS;
    constructor(prisma: PrismaService, notificationService: NotificationService, emailService: EmailService);
    private ensureCacheDirExists;
    private getCachePath;
    private isCacheValid;
    private callApi;
    getPaymentMethods(): Promise<KommerceResponse<any>>;
    createPayment(dto: CreateKommercePaymentDto): Promise<KommerceResponse<KommercePaymentData>>;
    getPaymentStatus(paymentId: string): Promise<KommerceResponse<KommercePaymentData>>;
    cancelPayment(dto: CancelKommercePaymentDto): Promise<KommerceResponse<any>>;
    handleCallback(body: any, receivedKey: string): Promise<{
        success: boolean;
        message: string;
    } | {
        success: boolean;
        message?: undefined;
    }>;
    private parseDateWithTimezone;
    getProvinces(): Promise<any>;
    getCities(provinceId?: string): Promise<any>;
    getDistricts(cityId: string): Promise<any>;
    getSubdistricts(districtId: string): Promise<any>;
    private readonly ALL_COURIERS;
    calculateCost(origin: string, destination: string, weight: number, courier?: string, price?: string): Promise<any>;
    trackWaybill(awb: string, courier: string, phone: string): Promise<any>;
}
