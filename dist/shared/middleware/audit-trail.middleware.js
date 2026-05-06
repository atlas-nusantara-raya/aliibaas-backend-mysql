"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditTrailMiddleware = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../database/prisma.service.js");
const jwt_1 = require("@nestjs/jwt");
let AuditTrailMiddleware = class AuditTrailMiddleware {
    prisma;
    jwtService;
    logger = new common_1.Logger('AuditTrail');
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async use(req, res, next) {
        const { method, originalUrl, ip, body, headers } = req;
        const userAgent = headers['user-agent'] || '';
        next();
        const writeMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];
        if (writeMethods.includes(method)) {
            res.on('finish', async () => {
                try {
                    let userId = req.user?.sub || req.user?.id || null;
                    if (!userId && headers.authorization) {
                        try {
                            const token = headers.authorization.replace('Bearer ', '');
                            const decoded = this.jwtService.decode(token);
                            userId = decoded?.sub || decoded?.id || null;
                        }
                        catch (e) {
                        }
                    }
                    const sanitizedBody = { ...body };
                    const sensitiveFields = ['password', 'pass', 'token', 'secret'];
                    for (const field of sensitiveFields) {
                        if (sanitizedBody[field])
                            sanitizedBody[field] = '********';
                    }
                    await this.prisma.auditTrail.create({
                        data: {
                            user_id: userId ? String(userId) : null,
                            method: method,
                            url: originalUrl,
                            payload: JSON.stringify(sanitizedBody),
                            ip_address: ip || req.headers['x-forwarded-for']?.toString() || '::1',
                            user_agent: userAgent,
                        },
                    });
                }
                catch (error) {
                    this.logger.error(`Failed to save audit trail for ${method} ${originalUrl}:`, error);
                }
            });
        }
    }
};
exports.AuditTrailMiddleware = AuditTrailMiddleware;
exports.AuditTrailMiddleware = AuditTrailMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService,
        jwt_1.JwtService])
], AuditTrailMiddleware);
//# sourceMappingURL=audit-trail.middleware.js.map