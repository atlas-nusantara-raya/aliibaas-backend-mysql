import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
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
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string | null;
            name: string | null;
            role: string;
        };
    }>;
}
