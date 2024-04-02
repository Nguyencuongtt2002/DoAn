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
export class NhaCungCapService {

    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get<any>(_api + '/api/NhaCungCap/get-all', { headers: headers });
    }
    create(nhacungcap: any): Observable<any> {
        return this.http.post(`${_api}/api/NhaCungCap/them`, nhacungcap, { headers: headers });
    }
    Delete(MaNhaCungCap: number): Observable<any> {
        return this.http.delete<any>(`${_api}/api/NhaCungCap/xoa/` + MaNhaCungCap, { headers: headers });
    }
    update(nhacungcap: any): Observable<any> {
        return this.http.put(`${_api}/api/NhaCungCap/update`, nhacungcap, { headers: headers });
    }

}
