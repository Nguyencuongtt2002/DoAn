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
export class ThamSoService {

    constructor(private http: HttpClient) { }

    getByKyHieu(KyHieu: string): Observable<any> {
        return this.http.get(`${_api}/api/ThamSo/getbykyhieu/${KyHieu}`);
    }
    getThamSoALL(): Observable<any> {
        return this.http.get(`${_api}/api/ThamSo/get-all`);
    }
    create(obj: any): Observable<any> {
        return this.http.post(`${_api}/api/ThamSo/them`, obj, { headers: headers });
    }

    Delete(id: number): Observable<any> {
        return this.http.delete<any>(`${_api}/api/ThamSo/xoa/` + id, { headers: headers });
    }

    update(obj: any): Observable<any> {
        return this.http.put(`${_api}/api/ThamSo/update`, obj, { headers: headers });
    }
}
