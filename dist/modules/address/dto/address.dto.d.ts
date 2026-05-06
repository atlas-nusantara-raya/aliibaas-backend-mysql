export declare class CreateAddressDto {
    label: string;
    recipientName: string;
    phone: string;
    address: string;
    provinceId: string;
    provinceName: string;
    cityId: string;
    cityName: string;
    districtId: string;
    districtName: string;
    postalCode: string;
    isDefault?: number;
}
export declare class UpdateAddressDto {
    label?: string;
    recipientName?: string;
    phone?: string;
    address?: string;
    provinceId?: string;
    provinceName?: string;
    cityId?: string;
    cityName?: string;
    districtId?: string;
    districtName?: string;
    postalCode?: string;
    isDefault?: number;
}
