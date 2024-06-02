import { Component, OnInit } from '@angular/core';
import { NguoidungService } from 'src/app/services/nguoidung.service';
import { Nguoidung } from 'src/app/models/nguoidung';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dang-nhap-user',
  templateUrl: './dang-nhap-user.component.html',
  styleUrls: ['./dang-nhap-user.component.css']
})
export class DangNhapUserComponent implements OnInit {
  TaiKhoan: string = "";
  MatKhau: string = "";
  constructor(private nd: NguoidungService, private auSrv: AuthService) { }

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

    const obj: any = {
      taiKhoan: this.TaiKhoan,
      matKhau: this.MatKhau,
    };

    this.auSrv.login(obj).subscribe((res) => {
      if (res.status == 404) {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Tên đăng nhập hoặc mật khẩu không hợp lệ'
        });
      }
      else if (res.success == false) {
        Swal.fire({
          title: "Error!",
          text: res.message,
          icon: "error",
        });
      }
      else {
        Swal.fire({
          title: 'Success',
          text: 'Đăng nhập thành công',
          icon: 'success'
        }).then((result) => {
          if (result.isConfirmed) {
            const data = {
              ...res.result,
              loginTime: new Date().getTime()
            };
            localStorage.setItem('user', JSON.stringify(data));
            location.assign('http://localhost:4200/');
          }
        });
      }
    });

  }
}