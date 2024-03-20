export interface Tintuc {
    maTinTuc: number;
    tieuDe: string;
    ngayDang: string;
    noiDung: string;
    anhTinTuc: string;
    maNguoiDung: number;
    hoTen: string;
    listjson_NoiDungCT: ChiTietTintuc[];
}
export interface ChiTietTintuc {
    maChiTiet: number;
    maTinTuc: number;
    noiDungChiTiet: string;
}
