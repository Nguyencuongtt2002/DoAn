export interface ThongKeDoanhThuTheoThang {
    sTT: number,
    thoiGian: string;
    doanhThuTheoThang: number;
}
export interface ThongKeSanPhamBanChay {
    tenSanPham: string,
    soLuongBan: number
}
export interface ThongKeDoanhThuTheoNam {
    nam: string;
    doanhThuTheoNam: number;
}

export interface ThongKeNguoiDungMuaHang {
    hoTen: string,
    doanhThu: number,
    nam: string
}
export interface ThongKeTongSoLuong {
    tongSanPham: number,
    tongNguoiDung: number,
    tongDoanhThu: number
}