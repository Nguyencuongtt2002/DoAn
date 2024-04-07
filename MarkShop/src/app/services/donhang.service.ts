import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Donhang } from 'src/app/models/donhang';
import { Lienhe } from 'src/app/models/lienhe';
import { Loaisanpham } from 'src/app/models/loaisanpham';
import { API_BASE_URL } from './api';
const _api = API_BASE_URL;
const _user = JSON.parse(localStorage.getItem('user') || '{}');
const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + _user.token
});
@Injectable({
    providedIn: 'root'
})
export class DonhangService {

    constructor(private http: HttpClient) { }

    getDonHangAll(): Observable<Array<Donhang>> {
        return this.http.get<Array<Donhang>>(_api + '/api/DonHang/get-all', { headers });
    }
    getChiTietDonHangByDonHang(obj: any): Observable<any> {
        return this.http.post(`${_api}/api/DonHang/getctdonhangbydonhang`, obj);
    }
    DuyetDon(obj: any): Observable<any> {
        return this.http.post(_api + '/api/DonHang/duyetdon', obj, { headers });
    }
    getlienheAll(obj: any): Observable<any> {
        return this.http.post<any>(_api + '/api/LienHe/get-all', obj);
    }
    thanhToan(obj: any): Observable<any> {
        return this.http.post(_api + '/api/DonHang/them', obj);
    }
    getLichSuMuaHang(userId: number): Observable<any> {
        return this.http.get<any>(`${_api}/api/DonHang/lichsumuahang/` + userId);
    }
    huyDon(obj: any): Observable<any> {
        return this.http.post<any>(_api + '/api/DonHang/huydon', obj);
    }
    excel(obj: any): Observable<Blob> {
        return this.http.post(`${_api}/api/DonHang/excel`, obj, { headers, responseType: 'blob' });
    }

    vnpay(obj: any): Observable<any> {
        return this.http.post<any>(_api + '/api/VnPay/vnpay', obj, { headers });
    }

    callback(data: any): Observable<any> {
        const queryString = Object.keys(data).map(key => key + '=' + encodeURIComponent(data[key])).join('&');
        return this.http.get<any>(`${_api}/api/VnPay/callback?${queryString}`, { headers });
    }

    getNewDonHang(): Observable<any> {
        return this.http.get<any>(_api + '/api/DonHang/getnew', { headers });
    }
    orderEmail(object: any): Observable<any> {
        return this.http.post<any>(`${_api}/api/DonHang/order-email`, object, { headers });
    }
    capNhatDonHang(obj: any): Observable<any> {
        return this.http.post<any>(_api + '/api/DonHang/capnhat-donhang', obj, { headers })
    }
    capNhatDonHangKhiGiao(obj: any): Observable<any> {
        return this.http.post<any>(_api + '/api/DonHang/capnhat-donhang-khigiao', obj, { headers })
    }

}
