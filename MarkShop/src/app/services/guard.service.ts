import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard {
    constructor(private authService: AuthService, private router: Router) { }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authService.isAuthenticated()) {
            const user = this.authService.getCurrentUser();
            if (user) {
                // vai trò là Admin,
                if (user.vaiTro === "Admin") {
                    return true;
                }
                // vai trò Nhân viên
                else if (user.vaiTro === "Nhân viên") {
                    if (state.url === '/admin/ad-nguoidung') {
                        this.router.navigate(['/dang-nhap-admin']);
                        return false;
                    } else {
                        return true;
                    }
                }
                else {
                    // vai trò khách hàng
                    if (user.vaiTro === "Khách hàng") {
                        if (state.url === '/tai-khoan' || state.url === '/thanh-toan') {
                            return true;
                        } else {
                            this.router.navigate(['/']);
                            return false;
                        }
                    }
                }
            }
        }
        this.router.navigate(['/']);
        return false;
    }

}