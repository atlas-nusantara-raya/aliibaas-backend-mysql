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
exports.CreateAdminAddressDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateAdminAddressDto {
    label;
    recipient_name;
    phone;
    address;
    province_id;
    province_name;
    city_id;
    city_name;
    district_id;
    district_name;
    postal_code;
    is_active;
}
exports.CreateAdminAddressDto = CreateAdminAddressDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'HO', description: 'Label alamat (misal: HO, Cabang Jakarta)' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAdminAddressDto.prototype, "label", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin Allibaas', description: 'Nama penerima/kontak di lokasi' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAdminAddressDto.prototype, "recipient_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '08123456789', description: 'Nomor telepon kantor' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAdminAddressDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Jl. Raya Utama No. 123', description: 'Alamat lengkap' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAdminAddressDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'ID Provinsi (RajaOngkir)' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAdminAddressDto.prototype, "province_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bali', description: 'Nama Provinsi' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAdminAddressDto.prototype, "province_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'ID Kota/Kabupaten (RajaOngkir)' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAdminAddressDto.prototype, "city_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Badung', description: 'Nama Kota/Kabupaten' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAdminAddressDto.prototype, "city_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123', description: 'ID Kecamatan (Kommerce)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAdminAddressDto.prototype, "district_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Kuta', description: 'Nama Kecamatan' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAdminAddressDto.prototype, "district_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '80361', description: 'Kode Pos' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAdminAddressDto.prototype, "postal_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Status aktif (1: Ya, 0: Tidak)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateAdminAddressDto.prototype, "is_active", void 0);
//# sourceMappingURL=create-admin-address.dto.js.map