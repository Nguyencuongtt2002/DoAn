import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tintuc } from '../models/tintuc';
import { API_BASE_URL } from './api';
const _api = API_BASE_URL;
const _user = JSON.parse(localStorage.getItem('user') || '{}');
const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + _user.token
});
@Injectable({
    providedIn: 'root'
})
export class TintucService {
    constructor(private http: HttpClient) { }

    getTinTucAll(obj: any): Observable<any> {
        return this.http.post<any>(_api + '/api/TinTuc/get-all', obj);
    }
    getOne(MaTinTuc: number): Observable<any> {
        return this.http.get<any>(_api + '/api/TinTuc/getbyid/' + MaTinTuc);
    }
    getTinTucKhac(MaTinTuc: number): Observable<any> {
        return this.http.get<any>(_api + '/api/TinTuc/gettintuckhac/' + MaTinTuc);
    }
    create(tintuc: any): Observable<any> {
        return this.http.post(`${_api}/api/TinTuc/them`, tintuc, { headers: headers });
    }

    Delete(id: number): Observable<any> {
        return this.http.delete<any>(`${_api}/api/TinTuc/xoa/` + id, { headers: headers });
    }

    update(tintuc: any): Observable<any> {
        return this.http.put(`${_api}/api/TinTuc/update`, tintuc, { headers: headers });
    }
}
