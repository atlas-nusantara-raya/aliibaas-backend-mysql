"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressModule = void 0;
const common_1 = require("@nestjs/common");
const address_service_js_1 = require("./address.service.js");
const address_controller_js_1 = require("./address.controller.js");
const database_module_js_1 = require("../../shared/database/database.module.js");
let AddressModule = class AddressModule {
};
exports.AddressModule = AddressModule;
exports.AddressModule = AddressModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_js_1.DatabaseModule],
        controllers: [address_controller_js_1.AddressController],
        providers: [address_service_js_1.AddressService],
        exports: [address_service_js_1.AddressService],
    })
], AddressModule);
//# sourceMappingURL=address.module.js.map