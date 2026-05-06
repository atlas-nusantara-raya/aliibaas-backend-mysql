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
exports.CalculateCostDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CalculateCostDto {
    origin;
    destination;
    weight;
    courier;
    price;
}
exports.CalculateCostDto = CalculateCostDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '114', description: 'Origin district ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CalculateCostDto.prototype, "origin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '702', description: 'Destination district ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CalculateCostDto.prototype, "destination", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1000, description: 'Weight in grams' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CalculateCostDto.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'jne:sicepat:jnt',
        description: 'Courier codes separated by colon. Default is all supported couriers'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CalculateCostDto.prototype, "courier", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'lowest',
        description: 'Price filter: "lowest" or "highest". Default is "lowest"'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CalculateCostDto.prototype, "price", void 0);
//# sourceMappingURL=calculate-cost.dto.js.map