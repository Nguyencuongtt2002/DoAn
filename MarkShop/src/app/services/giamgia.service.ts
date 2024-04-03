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
export class GiamGiaService {

    constructor(private http: HttpClient) { }
    create(obj: any): Observable<any> {
        return this.http.post(`${_api}/api/GiamGia/them`, obj, { headers: headers });
    }

    Delete(id: number): Observable<any> {
        return this.http.delete<any>(`${_api}/api/GiamGia/xoa/` + id, { headers: headers });
    }

    update(obj: any): Observable<any> {
        return this.http.put(`${_api}/api/GiamGia/update`, obj, { headers: headers });
    }
    getGiamGiaBySanPham(MaSanPham: number): Observable<any> {
        return this.http.get(`${_api}/api/GiamGia/getgiamgiabysanpham/${MaSanPham}`, { headers });
    }
}
