import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { API_BASE_URL } from './api';

const _api = API_BASE_URL;

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private currentUser: any;
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
    public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    constructor(private http: HttpClient, private router: Router) { }

    login(nguoidung: object): Observable<any> {
        return this.http.post<any>(_api + '/api/NguoiDung/dangnhap', nguoidung).pipe(
            tap((user) => {
                if (user && user?.result?.token) {
                    localStorage.setItem('user', JSON.stringify(user));
                    this.currentUser = user;
                    this.notifyAuthStateChange(true);
                }
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
        this.notifyAuthStateChange(false);
        this.router.navigate(['/']);
    }

    isAuthenticated(): boolean {
        const user = this.getCurrentUser();
        return !!user && !!user.token;
    }

    getCurrentUser(): any {
        const storedUser = localStorage.getItem('user');
        this.currentUser = storedUser ? JSON.parse(storedUser) : null;
        return this.currentUser;
    }

    isTokenValid(): boolean {
        const user = this.getCurrentUser();
        if (user && user.token) {
            const loginTime = user.loginTime;
            const tokenExpirationTime = loginTime + (12 * 60 * 60 * 1000); // 12 hours
            const currentTime = new Date().getTime();
            if (currentTime > tokenExpirationTime) {
                this.logout();
                return false;
            }
            return true;
        }
        return false;
    }

    private hasToken(): boolean {
        return !!localStorage.getItem('user');
    }

    notifyAuthStateChange(isAuthenticated: boolean) {
        this.isAuthenticatedSubject.next(isAuthenticated);
    }
}
