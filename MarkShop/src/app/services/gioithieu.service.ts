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
export class GioiThieuService {
    constructor(private http: HttpClient) { }

    getGioiThieuAll(): Observable<any> {
        return this.http.get<any>(_api + '/api/GioiThieu/get-all');
    }
    create(gioithieu: any): Observable<any> {
        return this.http.post(`${_api}/api/GioiThieu/them`, gioithieu, { headers: headers });
    }
    Delete(id: number): Observable<any> {
        return this.http.delete<any>(`${_api}/api/GioiThieu/xoa/` + id, { headers: headers });
    }
    update(gioithieu: any): Observable<any> {
        return this.http.put(`${_api}/api/GioiThieu/update`, gioithieu, { headers: headers });
    }

}
