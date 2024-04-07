import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './api';
const _api = API_BASE_URL;
const _user = JSON.parse(localStorage.getItem('user') || '{}');
const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + _user.token
});
@Injectable({
    providedIn: 'root'
})
export class ThuongHieuService {

    constructor(private http: HttpClient) { }

    getThuongHieuAll(): Observable<any> {
        return this.http.get<any>(_api + '/api/ThuongHieu/get-all');
    }
    getSanPhamTheoTH(page: number, pageSize: number, maThuongHieu: number): Observable<any> {
        return this.http.get(_api + `/api/SanPham/timkiem?page=${page}&pageSize=${pageSize}&maThuongHieu=${maThuongHieu}`)
    }
    create(thuonghieu: any): Observable<any> {
        return this.http.post(`${_api}/api/ThuongHieu/them`, thuonghieu, { headers: headers });
    }
    Delete(MaThuongHieu: number): Observable<any> {
        return this.http.delete<any>(`${_api}/api/ThuongHieu/xoa/` + MaThuongHieu, { headers: headers });
    }
    update(thuonghieu: any): Observable<any> {
        return this.http.put(`${_api}/api/ThuongHieu/update`, thuonghieu, { headers: headers });
    }

}
