import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
const _api = 'https://localhost:44377';
@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private currentUser: any;

    constructor(private http: HttpClient) { }

    login(nguoidung: object): Observable<any> {
        return this.http.post<any>(_api + '/api/NguoiDung/dangnhap', nguoidung).pipe(
            tap((user) => {

            }),
            catchError((error) => {
                console.error('Login failed', error);
                return of(null);
            })
        );

    }

    logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('cart');
        this.currentUser = null;
        location.assign('/');
    }
    // kiểm tra người dùng đã tồn tại chưa
    isAuthenticated(): boolean {
        const user = this.getCurrentUser();
        return !!user && !!user.token;
    }
    //lưu localStorage
    getCurrentUser(): any {
        const storedUser = localStorage.getItem('user');
        this.currentUser = storedUser ? JSON.parse(storedUser) : null;
        return this.currentUser;
    }
}