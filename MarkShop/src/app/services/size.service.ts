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
export class SizeService {

    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get<any>(_api + '/api/Size/get-all', { headers: headers });
    }

    create(size: any): Observable<any> {
        return this.http.post(`${_api}/api/Size/them`, size, { headers: headers });
    }

    Delete(id: number): Observable<any> {
        return this.http.delete<any>(`${_api}/api/Size/xoa/` + id, { headers: headers });
    }

    update(size: any): Observable<any> {
        return this.http.put(`${_api}/api/Size/update`, size, { headers: headers });
    }
}
