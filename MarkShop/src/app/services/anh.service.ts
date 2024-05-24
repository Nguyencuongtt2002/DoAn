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
export class AnhService {

    constructor(private http: HttpClient) { }

    getAllAnh(): Observable<any> {
        return this.http.get<any>(_api + '/api/Anh/get-all');
    }

    create(obj: any): Observable<any> {
        return this.http.post(`${_api}/api/Anh/them`, obj, { headers: headers });
    }
    Delete(id: number): Observable<any> {
        return this.http.delete<any>(`${_api}/api/Anh/xoa/` + id, { headers: headers });
    }
    update(obj: any): Observable<any> {
        return this.http.put(`${_api}/api/Anh/update`, obj, { headers: headers });
    }

}
