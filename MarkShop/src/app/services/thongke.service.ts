import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
    ThongKeDoanhThuTheoNam, ThongKeDoanhThuTheoThang, ThongKeNguoiDungMuaHang,
    ThongKeSanPhamBanChay, ThongKeTongSoLuong
}
    from 'src/app/models/thongke';
import { API_BASE_URL } from './api';
const _api = API_BASE_URL;
const _user = JSON.parse(localStorage.getItem('user') || '{}');
const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + _user.token
});
@Injectable({
    providedIn: 'root'
})
export class ThongKeService {

    constructor(private http: HttpClient) { }

    thongKeDoanhThuTheoThang(): Observable<Array<ThongKeDoanhThuTheoThang>> {
        return this.http.get<Array<ThongKeDoanhThuTheoThang>>(_api + '/api/ThongKe/doanhthutheothang', { headers: headers });
    }
    thongKeSanPhamBanChay(): Observable<Array<ThongKeSanPhamBanChay>> {
        return this.http.get<Array<ThongKeSanPhamBanChay>>(_api + '/api/ThongKe/sanphambanchay', { headers: headers });
    }
    thongKeNguoiDungMuaHang(): Observable<Array<ThongKeNguoiDungMuaHang>> {
        return this.http.get<Array<ThongKeNguoiDungMuaHang>>(_api + '/api/ThongKe/nguoidungmuanhieu', { headers: headers });
    }
    thongKeDoanhThuTheoNam(): Observable<Array<ThongKeDoanhThuTheoNam>> {
        return this.http.get<Array<ThongKeDoanhThuTheoNam>>(_api + '/api/ThongKe/doanhthutheonam', { headers: headers })
    }
    thongKeTongSoLuong(): Observable<Array<ThongKeTongSoLuong>> {
        return this.http.get<Array<ThongKeTongSoLuong>>(_api + '/api/ThongKe/tongsoluong', { headers: headers })
    }
}
