import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';
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
                        Swal.fire({
                            icon: 'warning',
                            title: 'Truy cập bị từ chối',
                            text: 'Nhân viên không có quyền truy cập vào trang này!',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'OK'
                        }).then((result) => {
                            if (result.isConfirmed || result.isDismissed) {
                                this.router.navigate(['/dang-nhap-admin']);
                            }
                        });
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