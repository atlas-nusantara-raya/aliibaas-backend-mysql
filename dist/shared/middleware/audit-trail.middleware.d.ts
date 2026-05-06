import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../database/prisma.service.js';
import { JwtService } from '@nestjs/jwt';
export declare class AuditTrailMiddleware implements NestMiddleware {
    private prisma;
    private jwtService;
    private readonly logger;
    constructor(prisma: PrismaService, jwtService: JwtService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
