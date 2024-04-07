import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './api';
const _api = API_BASE_URL;
console.log(_api)
const _user = JSON.parse(localStorage.getItem('user') || '{}');
const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + _user.token
});
@Injectable({
    providedIn: 'root'
})
export class ThongSoService {

    constructor(private http: HttpClient) { }
    create(obj: any): Observable<any> {
        return this.http.post(`${_api}/api/ThongSo/them`, obj, { headers: headers });
    }

    Delete(id: number): Observable<any> {
        return this.http.delete<any>(`${_api}/api/ThongSo/xoa/` + id, { headers: headers });
    }

    update(obj: any): Observable<any> {
        return this.http.put(`${_api}/api/ThongSo/update`, obj, { headers: headers });
    }
    getThongsoBySanPham(MaSanPham: number): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + _user.token);
        return this.http.get(`${_api}/api/ThongSo/getthongsobysanpham/${MaSanPham}`, { headers });
    }
}
