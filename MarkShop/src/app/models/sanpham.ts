export interface Sanpham {
    maSanPham: number;
    tenSP: string;
    moTa: string;
    ngayTao: Date;
    maSize: number;
    maLoaiSanPham: number;
    maThuongHieu: number;
    anhDaiDien: string;
    phanTram: number;
    donGia: number;
    giaMoiKhiGiam: number;
    soLuong: number;
    tenLoaiSanPham: string;
    tenThuongHieu: string;
    tenSize: string;
    listjson_thongso: ThongSoSanPham[];
}
export interface ThongSoSanPham {
    maThongSo: number;
    tenThongSo?: string;
    moTa: string;
    tenSP: string;
}