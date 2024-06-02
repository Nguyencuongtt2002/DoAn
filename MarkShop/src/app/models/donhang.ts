// donhang.model.ts
export interface Donhang {
    maDonHang: number;
    ngayDat: Date;
    ngayGiao: Date;
    tinhTrang: number;
    soDienThoai: string;
    hoTen: string;
    diaChi: string;
    soLuong: number;
    giaTien: number;
    tenSP: string;
    maSanPham: number;
}

export interface ChiTietDonHang {
    maChiTiet: number;
    maDonHang: number;
    maSanPham: number;
    soLuong: number;
    giaTien: number;
    tenSP: string;
    tinhTrang: number;
}

