import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu } from 'src/app/models/menu';
import { API_BASE_URL } from './api';
const _api = API_BASE_URL;
const _user = JSON.parse(localStorage.getItem('user') || '{}');
const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + _user.token
});
@Injectable({
    providedIn: 'root'
})
export class MenuService {

    constructor(private http: HttpClient) { }

    getAll(obj: any): Observable<any> {
        return this.http.post<Array<any>>(_api + '/api/Menu/get-all', obj);
    }
    create(menu: any): Observable<any> {
        return this.http.post(`${_api}/api/Menu/them`, menu, { headers: headers });
    }
    Delete(id: number): Observable<any> {
        return this.http.delete<any>(`${_api}/api/Menu/xoa/` + id, { headers: headers });
    }
    update(menu: any): Observable<any> {
        return this.http.put(`${_api}/api/Menu/update`, menu, { headers: headers });
    }
}
