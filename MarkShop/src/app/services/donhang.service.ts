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
    getChiTietDonHangByDonHang(id: number): Observable<any> {
        return this.http.get(`${_api}/api/DonHang/getctdonhangbydonhang/${id}`,);
    }
    DuyetDon(ma: number): Observable<any> {
        return this.http.get(`${_api}/api/DonHang/duyetdon/${ma}`, { headers });
    }
    getlienheAll(obj: any): Observable<any> {
        return this.http.post<any>(_api + '/api/LienHe/get-all', obj);
    }
    thanhToan(obj: any): Observable<any> {
        return this.http.post(_api + '/api/DonHang/them', obj, { headers });
    }
    getLichSuMuaHang(userId: number): Observable<any> {
        return this.http.get<any>(`${_api}/api/DonHang/lichsumuahang/` + userId, { headers });
    }
    huyDon(obj: any): Observable<any> {
        return this.http.post<any>(_api + '/api/DonHang/huydon', obj);
    }
    excel(MaDonHang: any): Observable<Blob> {
        return this.http.get(`${_api}/api/DonHang/excel/${MaDonHang}`, { headers, responseType: 'blob' });
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
    getTheoMa(id: number): Observable<any> {
        return this.http.get<any>(`${_api}/api/DonHang/getbyid/${id}`)
    }
    // capNhatDonHangKhiGiao(obj: any): Observable<any> {
    //     return this.http.post<any>(_api + '/api/DonHang/capnhat-donhang-khigiao', obj, { headers })
    // }

}
