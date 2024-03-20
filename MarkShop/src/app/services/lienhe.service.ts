import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lienhe } from 'src/app/models/lienhe';
const _api = 'https://localhost:44377';
const _user = JSON.parse(localStorage.getItem('user') || '{}');
const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + _user.token
});
@Injectable({
    providedIn: 'root'
})
export class LienheService {
    constructor(private http: HttpClient) { }

    getlienheAll(obj: any): Observable<any> {
        return this.http.post<any>(_api + '/api/LienHe/get-all', obj);
    }
    create(lienhe: any): Observable<any> {
        return this.http.post(`${_api}/api/LienHe/them`, lienhe, { headers: headers });
    }
    Delete(id: number): Observable<any> {
        return this.http.delete<any>(`${_api}/api/LienHe/xoa/` + id, { headers: headers });
    }
    update(lienhe: any): Observable<any> {
        return this.http.put(`${_api}/api/LienHe/update`, lienhe, { headers: headers });
    }
}
