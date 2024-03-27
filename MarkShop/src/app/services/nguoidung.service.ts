import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Nguoidung } from 'src/app/models/nguoidung'
const _api = 'https://localhost:44377';
const _user = JSON.parse(localStorage.getItem('user') || '{}');
const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + _user.token
});
@Injectable({
    providedIn: 'root'
})
export class NguoidungService {

    constructor(private http: HttpClient) { }

    login(nguoidung: Nguoidung): Observable<any> {
        return this.http.post(`${_api}/api/NguoiDung/dangnhap`, nguoidung);
    }
    checkLogin(): any {

        let data = localStorage.getItem('user')
        if (data) {
            return JSON.parse(data)
        }
        return false;
    }
    getAll(obj: any): Observable<any> {
        return this.http.post<Array<any>>(_api + '/api/NguoiDung/get-all', obj, { headers: headers });
    }
    update = (nguoidung: any): Observable<Nguoidung> => {
        return this.http.put<Nguoidung>(_api + '/api/NguoiDung/update', nguoidung, { headers: headers });
    }
    kiemtra = (nguoidung: Nguoidung): Observable<any> => {
        return this.http.post<any>(`${_api}/api/NguoiDung/check`, nguoidung);
    }
    createUser = (nguoidung: Nguoidung): Observable<any> => {
        return this.http.post<any>(`${_api}/api/NguoiDung/them`, nguoidung);
    }
    Delete(id: number): Observable<any> {
        return this.http.delete<any>(`${_api}/api/NguoiDung/xoa/` + id, { headers: headers });
    }
    ResetMatKhau(obj: any): Observable<any> {
        return this.http.post<Array<any>>(_api + '/api/NguoiDung/resetmatkhau', obj, { headers: headers });
    }
}