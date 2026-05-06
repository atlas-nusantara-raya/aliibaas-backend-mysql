"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAddressModule = void 0;
const common_1 = require("@nestjs/common");
const admin_address_service_js_1 = require("./admin-address.service.js");
const admin_address_controller_js_1 = require("./admin-address.controller.js");
const database_module_js_1 = require("../../shared/database/database.module.js");
let AdminAddressModule = class AdminAddressModule {
};
exports.AdminAddressModule = AdminAddressModule;
exports.AdminAddressModule = AdminAddressModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_js_1.DatabaseModule],
        controllers: [admin_address_controller_js_1.AdminAddressController],
        providers: [admin_address_service_js_1.AdminAddressService],
        exports: [admin_address_service_js_1.AdminAddressService],
    })
], AdminAddressModule);
//# sourceMappingURL=admin-address.module.js.map