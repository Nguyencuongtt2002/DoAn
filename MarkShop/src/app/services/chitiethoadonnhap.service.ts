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
export class ChiTietHoaDonNhapService {

    constructor(private http: HttpClient) { }
    getAll(): Observable<any> {
        return this.http.get<any>(_api + '/api/CTHoaDonNhap/get-all', { headers });
    }
    create(obj: any): Observable<any> {
        return this.http.post(`${_api}/api/CTHoaDonNhap/them`, obj, { headers: headers });
    }
    Delete(id: number): Observable<any> {
        return this.http.delete<any>(`${_api}/api/CTHoaDonNhap/xoa/` + id, { headers: headers });
    }
    update(obj: any): Observable<any> {
        return this.http.put(`${_api}/api/CTHoaDonNhap/update`, obj, { headers: headers });
    }
    getcthoadonnhapByhoadonnhap(id: number): Observable<any> {
        return this.http.get(`${_api}/api/CTHoaDonNhap/getcthdnbyhdn/${id}`, { headers });
    }
    excel(id: number): Observable<Blob> {
        return this.http.get(`${_api}/api/CTHoaDonNhap/excel/` + id, { headers, responseType: 'blob' });
    }
}
