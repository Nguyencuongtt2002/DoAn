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
}
