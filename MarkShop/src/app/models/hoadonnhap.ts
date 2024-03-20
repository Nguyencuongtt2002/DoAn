export interface HoaDonNhap {
    maHDN: number,
    ngayNhap: string,
    maNhaCungCap: number,
    maNguoiDung: number,
    hoTen: string,
    tenNhaCungCap: string
}
export interface ChiTietHoaDonNhap {
    maChiTiet: number,
    maHDN: number,
    maSanPham: number,
    soLuong: number,
    giaTien: number,
    hoTen: string,
    tenSP: string
}