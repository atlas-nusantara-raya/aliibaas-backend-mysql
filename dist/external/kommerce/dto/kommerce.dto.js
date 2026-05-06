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
exports.CancelKommercePaymentDto = exports.KommerceCallbackDto = exports.CreateKommercePaymentDto = exports.KommerceItemDto = exports.KommerceCustomerDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class KommerceCustomerDto {
    name;
    email;
    phone;
}
exports.KommerceCustomerDto = KommerceCustomerDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], KommerceCustomerDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], KommerceCustomerDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], KommerceCustomerDto.prototype, "phone", void 0);
class KommerceItemDto {
    name;
    quantity;
    price;
}
exports.KommerceItemDto = KommerceItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], KommerceItemDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], KommerceItemDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], KommerceItemDto.prototype, "price", void 0);
class CreateKommercePaymentDto {
    order_id;
    payment_type;
    channel_code;
    amount;
    customer;
    items;
    expiry_duration;
    callback_url;
    callback_API_KEY;
}
exports.CreateKommercePaymentDto = CreateKommercePaymentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateKommercePaymentDto.prototype, "order_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateKommercePaymentDto.prototype, "payment_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateKommercePaymentDto.prototype, "channel_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateKommercePaymentDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => KommerceCustomerDto),
    __metadata("design:type", KommerceCustomerDto)
], CreateKommercePaymentDto.prototype, "customer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [KommerceItemDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => KommerceItemDto),
    __metadata("design:type", Array)
], CreateKommercePaymentDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateKommercePaymentDto.prototype, "expiry_duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateKommercePaymentDto.prototype, "callback_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateKommercePaymentDto.prototype, "callback_API_KEY", void 0);
class KommerceCallbackDto {
    payment_id;
    order_id;
    status;
    amount;
}
exports.KommerceCallbackDto = KommerceCallbackDto;
class CancelKommercePaymentDto {
    payment_id;
    reason;
}
exports.CancelKommercePaymentDto = CancelKommercePaymentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CancelKommercePaymentDto.prototype, "payment_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Customer canceled the order' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CancelKommercePaymentDto.prototype, "reason", void 0);
//# sourceMappingURL=kommerce.dto.js.map