"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_js_1 = require("./shared/database/database.module.js");
const auth_module_js_1 = require("./modules/auth/auth.module.js");
const catalog_module_js_1 = require("./modules/catalog/catalog.module.js");
const inventory_module_js_1 = require("./modules/inventory/inventory.module.js");
const order_module_js_1 = require("./modules/order/order.module.js");
const cart_module_js_1 = require("./modules/cart/cart.module.js");
const category_module_js_1 = require("./modules/category/category.module.js");
const brand_module_js_1 = require("./modules/brand/brand.module.js");
const wishlist_module_js_1 = require("./modules/wishlist/wishlist.module.js");
const address_module_js_1 = require("./modules/address/address.module.js");
const review_module_js_1 = require("./modules/review/review.module.js");
const status_module_js_1 = require("./modules/status/status.module.js");
const color_module_js_1 = require("./modules/color/color.module.js");
const size_module_js_1 = require("./modules/size/size.module.js");
const kommerce_module_js_1 = require("./external/kommerce/kommerce.module.js");
const throttler_1 = require("@nestjs/throttler");
const jwt_1 = require("@nestjs/jwt");
const core_1 = require("@nestjs/core");
const custom_throttler_guard_js_1 = require("./shared/guards/custom-throttler.guard.js");
const audit_trail_middleware_js_1 = require("./shared/middleware/audit-trail.middleware.js");
const admin_address_module_js_1 = require("./modules/admin-address/admin-address.module.js");
const notification_module_js_1 = require("./modules/notification/notification.module.js");
const email_module_js_1 = require("./shared/email/email.module.js");
const schedule_1 = require("@nestjs/schedule");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(audit_trail_middleware_js_1.AuditTrailMiddleware)
            .exclude('docs', 'docs-json', 'docs/*path', 'favicon.ico')
            .forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            database_module_js_1.DatabaseModule,
            auth_module_js_1.AuthModule,
            catalog_module_js_1.CatalogModule,
            inventory_module_js_1.InventoryModule,
            order_module_js_1.OrderModule,
            cart_module_js_1.CartModule,
            category_module_js_1.CategoryModule,
            brand_module_js_1.BrandModule,
            wishlist_module_js_1.WishlistModule,
            address_module_js_1.AddressModule,
            review_module_js_1.ReviewModule,
            status_module_js_1.StatusModule,
            color_module_js_1.ColorModule,
            size_module_js_1.SizeModule,
            kommerce_module_js_1.KommerceModule,
            admin_address_module_js_1.AdminAddressModule,
            notification_module_js_1.NotificationModule,
            email_module_js_1.EmailModule,
            throttler_1.ThrottlerModule.forRoot([{
                    name: 'short',
                    ttl: 10000,
                    limit: 30,
                }, {
                    name: 'medium',
                    ttl: 60000,
                    limit: 120,
                }, {
                    name: 'auth',
                    ttl: 60000,
                    limit: 20,
                }]),
            jwt_1.JwtModule.register({}),
        ],
        controllers: [],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: custom_throttler_guard_js_1.CustomThrottlerGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map