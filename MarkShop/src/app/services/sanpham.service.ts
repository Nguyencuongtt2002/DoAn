import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sanpham } from 'src/app/models/sanpham'
import { API_BASE_URL } from './api';
const _api = API_BASE_URL;
const _user = JSON.parse(localStorage.getItem('user') || '{}');
const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + _user.token
});
@Injectable({
    providedIn: 'root'
})
export class SanphamService {

    constructor(private http: HttpClient) { }
    getSanPhamMoi(): Observable<Array<Sanpham>> {
        return this.http.get<Array<Sanpham>>(_api + '/api/SanPham/getSPM/10');
    }
    getSanPhamBanChay(): Observable<Array<Sanpham>> {
        return this.http.get<Array<Sanpham>>(_api + '/api/SanPham/getSPBC/10');
    }
    getSanPhamgiamgia(): Observable<Array<Sanpham>> {
        return this.http.get<Array<Sanpham>>(_api + '/api/SanPham/getSPGG/10');
    }
    getOne(MaSanPham: number): Observable<any> {
        return this.http.get<any>(_api + '/api/SanPham/getbyid/' + MaSanPham);
    }
    sanPhamCungLoai(obj: any): Observable<any> {
        return this.http.post<any>(_api + '/api/SanPham/san-pham-cung-loai', obj);
    }
    getSPAll(obj: any): Observable<any> {
        return this.http.post<any>(_api + '/api/SanPham/get-all', obj);
    }
    getNewSanPham(): Observable<any> {
        return this.http.get<any>(_api + '/api/SanPham/getnew', { headers });
    }
    create(obj: any): Observable<any> {
        return this.http.post(`${_api}/api/SanPham/them`, obj, { headers: headers });
    }
    Delete(id: number): Observable<any> {
        return this.http.delete<any>(`${_api}/api/SanPham/xoa/` + id, { headers: headers });
    }
    update(obj: any): Observable<any> {
        return this.http.put(`${_api}/api/SanPham/update`, obj, { headers: headers });
    }
    TimKiem(obj: any): Observable<any> {
        return this.http.post(_api + '/api/SanPham/timkiem', obj);;
    }
}
