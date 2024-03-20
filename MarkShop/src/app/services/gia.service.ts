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
export class GiaService {

    constructor(private http: HttpClient) { }
    create(obj: any): Observable<any> {
        return this.http.post(`${_api}/api/Gia/them`, obj, { headers: headers });
    }

    Delete(id: number): Observable<any> {
        return this.http.delete<any>(`${_api}/api/Gia/xoa/` + id, { headers: headers });
    }

    update(obj: any): Observable<any> {
        return this.http.put(`${_api}/api/Gia/update`, obj, { headers: headers });
    }
    getgiaBySanPham(MaSanPham: number): Observable<any> {
        return this.http.get(`${_api}/api/Gia/getgiabysanpham/${MaSanPham}`, { headers });
    }
}
