"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModule = void 0;
const common_1 = require("@nestjs/common");
const order_service_js_1 = require("./order.service.js");
const order_controller_js_1 = require("./order.controller.js");
const auth_module_js_1 = require("../auth/auth.module.js");
const cart_module_js_1 = require("../cart/cart.module.js");
const kommerce_module_js_1 = require("../../external/kommerce/kommerce.module.js");
const order_scheduler_service_js_1 = require("./order-scheduler.service.js");
let OrderModule = class OrderModule {
};
exports.OrderModule = OrderModule;
exports.OrderModule = OrderModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_js_1.AuthModule, cart_module_js_1.CartModule, kommerce_module_js_1.KommerceModule],
        providers: [order_service_js_1.OrderService, order_scheduler_service_js_1.OrderSchedulerService],
        controllers: [order_controller_js_1.OrderController],
        exports: [order_service_js_1.OrderService],
    })
], OrderModule);
//# sourceMappingURL=order.module.js.map