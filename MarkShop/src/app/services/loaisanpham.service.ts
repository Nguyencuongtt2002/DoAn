import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const _api = 'https://localhost:44377';
const _user = JSON.parse(localStorage.getItem('user') || '{}');
const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + _user.token
});
@Injectable({
    providedIn: 'root'
})
export class LoaisanphamService {

    constructor(private http: HttpClient) { }

    getLoaiSanPhamAll(): Observable<any> {
        return this.http.get<any>(_api + '/api/LoaiSanPham/get-all');
    }
    getSanPhamTheoLoai(obj: any): Observable<any> {
        return this.http.post(_api + '/api/SanPham/timkiem', obj)
    }
    create(loaisanpham: any): Observable<any> {
        return this.http.post(`${_api}/api/LoaiSanPham/them`, loaisanpham, { headers: headers });
    }
    Delete(MaLoaiSanPham: number): Observable<any> {
        return this.http.delete<any>(`${_api}/api/LoaiSanPham/xoa/` + MaLoaiSanPham, { headers: headers });
    }
    update(loaiSanPham: any): Observable<any> {
        return this.http.put(`${_api}/api/LoaiSanPham/update`, loaiSanPham, { headers: headers });
    }

}
