import { Component, OnInit } from '@angular/core';
import { NguoidungService } from 'src/app/services/nguoidung.service';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dang-nhap-user',
  templateUrl: './dang-nhap-user.component.html',
  styleUrls: ['./dang-nhap-user.component.css']
})
export class DangNhapUserComponent implements OnInit {
  TaiKhoan: string = "";
  MatKhau: string = "";

  constructor(private nd: NguoidungService, private auSrv: AuthService, private router: Router) { }

  ngOnInit(): void { }

  Login() {
    if (!this.TaiKhoan || !this.MatKhau) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Vui lòng nhập tên đăng nhập và mật khẩu'
      });
      return; // Exit the function if fields are blank
    }

    const obj = { taiKhoan: this.TaiKhoan, matKhau: this.MatKhau };
    this.auSrv.login(obj).subscribe((res) => {
      if (res.status === 404) {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Tên đăng nhập hoặc mật khẩu không hợp lệ'
        });
      } else if (res.success === false) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: res.message
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Đăng nhập thành công',
          allowOutsideClick: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading(); // Hiển thị tiến trình tiến triển khi cửa sổ được mở
          },
          timer: 5000, // Tự động đóng cửa sổ sau 3 giây
          timerProgressBar: true // Hiển thị thanh tiến trình
        }).then(() => {
          const data = { ...res.result, loginTime: new Date().getTime() };
          localStorage.setItem('user', JSON.stringify(data));
          this.router.navigate(['/']);
        });
      }
    });
  }
}

