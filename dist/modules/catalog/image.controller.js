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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageController = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
const swagger_1 = require("@nestjs/swagger");
const app_key_guard_js_1 = require("../../shared/guards/app-key.guard.js");
let ImageController = class ImageController {
    async getFile(filename, res) {
        const storageDir = process.env.UPLOAD_DIR || (0, path_1.join)(process.cwd(), 'storage');
        const filePath = (0, path_1.join)(storageDir, 'catalog', 'images', filename);
        if (!(0, fs_1.existsSync)(filePath)) {
            throw new common_1.NotFoundException('Image not found');
        }
        const ext = filename.split('.').pop()?.toLowerCase();
        const mimeTypes = {
            'png': 'image/png',
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'gif': 'image/gif'
        };
        const contentType = ext ? mimeTypes[ext] : 'application/octet-stream';
        res.set({
            'Content-Type': contentType || 'application/octet-stream',
            'Cache-Control': 'public, max-age=31536000'
        });
        const file = (0, fs_1.createReadStream)(filePath);
        return new common_1.StreamableFile(file);
    }
};
exports.ImageController = ImageController;
__decorate([
    (0, common_1.Get)(':filename'),
    (0, common_1.UseGuards)(app_key_guard_js_1.AppKeyGuard),
    (0, swagger_1.ApiSecurity)('x-app-secret'),
    (0, swagger_1.ApiOperation)({ summary: 'Protected access to product images' }),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ImageController.prototype, "getFile", null);
exports.ImageController = ImageController = __decorate([
    (0, swagger_1.ApiTags)('User - Images'),
    (0, common_1.Controller)('catalog/images')
], ImageController);
//# sourceMappingURL=image.controller.js.map