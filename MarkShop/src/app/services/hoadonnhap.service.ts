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
export class HoaDonNhapService {

    constructor(private http: HttpClient) { }
    getAll(obj: any): Observable<any> {
        return this.http.post<any>(_api + '/api/HoaDonNhap/get-all', obj, { headers });
    }
    getOne(id: number): Observable<any> {
        return this.http.get<any>(_api + '/api/HoaDonNhap/getbyid/' + id, { headers })
    }
    getNewHoaDonNhap(): Observable<any> {
        return this.http.get<any>(_api + '/api/HoaDonNhap/getnew', { headers });
    }
    create(obj: any): Observable<any> {
        return this.http.post(`${_api}/api/HoaDonNhap/them`, obj, { headers: headers });
    }
    Delete(id: number): Observable<any> {
        return this.http.delete<any>(`${_api}/api/HoaDonNhap/xoa/` + id, { headers: headers });
    }
    update(obj: any): Observable<any> {
        return this.http.put(`${_api}/api/HoaDonNhap/update`, obj, { headers: headers });
    }
}
