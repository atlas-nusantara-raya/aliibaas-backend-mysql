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
exports.CheckoutDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CheckoutDto {
    addressId;
    cartId;
    paymentMethodCode;
    courier;
    courierService;
    shippingCost;
    idempotencyKey;
}
exports.CheckoutDto = CheckoutDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Address ID to ship to' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CheckoutDto.prototype, "addressId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Cart ID to checkout' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CheckoutDto.prototype, "cartId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'qris', description: 'Payment method code (e.g. qris, bank_transfer)' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CheckoutDto.prototype, "paymentMethodCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'jne', description: 'Courier code (e.g. jne, pos, jnt)' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CheckoutDto.prototype, "courier", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'REG', description: 'Courier service (e.g. REG, YES, OKE)' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CheckoutDto.prototype, "courierService", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 15000, description: 'Shipping cost' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CheckoutDto.prototype, "shippingCost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-v4-key', description: 'Unique idempotency key (Optional, backend will generate one if omitted)', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CheckoutDto.prototype, "idempotencyKey", void 0);
//# sourceMappingURL=checkout.dto.js.map