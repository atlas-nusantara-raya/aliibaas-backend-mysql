import { PrismaService } from '../../shared/database/prisma.service.js';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private jwtService;
    private readonly logger;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(email: string, pass: string, name: string, phone: string): Promise<{
        roles: ({
            role: {
                id: number;
                name: string;
            };
        } & {
            role_id: number;
            user_id: string;
        })[];
        id: string;
        email: string | null;
        name: string | null;
        phone: string | null;
        created_at: Date | null;
    }>;
    login(email: string, pass: string): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string | null;
            name: string | null;
            role: string;
        };
    }>;
}
