"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppKeyGuard = void 0;
const common_1 = require("@nestjs/common");
let AppKeyGuard = class AppKeyGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const url = request.url;
        if (url.includes('/docs') || url === '/' || process.env.BYPASS_AUTH === 'true') {
            return true;
        }
        const appSecret = process.env.APP_SECRET;
        const clientSecret = request.headers['x-app-secret'];
        if (!clientSecret || clientSecret !== appSecret) {
            console.error(`[AppKeyGuard] 403 Forbidden: URL=${url}, Header=${clientSecret ? 'Mismatch' : 'Missing'}`);
            throw new common_1.ForbiddenException('Invalid or missing App Secret Key');
        }
        return true;
    }
};
exports.AppKeyGuard = AppKeyGuard;
exports.AppKeyGuard = AppKeyGuard = __decorate([
    (0, common_1.Injectable)()
], AppKeyGuard);
//# sourceMappingURL=app-key.guard.js.map