"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KommerceModule = void 0;
const common_1 = require("@nestjs/common");
const kommerce_service_js_1 = require("./kommerce.service.js");
const kommerce_controller_js_1 = require("./kommerce.controller.js");
let KommerceModule = class KommerceModule {
};
exports.KommerceModule = KommerceModule;
exports.KommerceModule = KommerceModule = __decorate([
    (0, common_1.Module)({
        controllers: [kommerce_controller_js_1.KommerceController],
        providers: [kommerce_service_js_1.KommerceService],
        exports: [kommerce_service_js_1.KommerceService],
    })
], KommerceModule);
//# sourceMappingURL=kommerce.module.js.map