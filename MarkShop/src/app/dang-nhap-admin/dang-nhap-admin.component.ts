import { OnInit, Component } from '@angular/core';
import { LoadCssService } from 'src/app/services/loadcss.service';
import { NguoidungService } from '../services/nguoidung.service';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dang-nhap-admin',
  templateUrl: './dang-nhap-admin.component.html',
  styleUrls: ['./dang-nhap-admin.component.css']
})
export class DangNhapAdminComponent implements OnInit {
  TaiKhoan: string = "";
  MatKhau: string = "";
  constructor(private load: LoadCssService, private nd: NguoidungService, private authSrv: AuthService) { }

  ngOnInit(): void {
    this.loadCss();
  }
  private async loadCss(): Promise<void> {
    await this.load.loadCSS('/assets/StyleForm.css');
  }
  LoginAd() {
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

    this.authSrv.login(obj).subscribe((res) => {
      console.log(res.result)
      if (res.status === 404) {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Tên đăng nhập hoặc mật khẩu không hợp lệ'
        });
      }
      else if (res.result.vaiTro === "Admin" || res.result.vaiTro === "Nhân viên" && res.status === 200) {
        Swal.fire({
          title: 'Success',
          text: 'Đăng nhập thành công',
          icon: 'success'
        }).then((result) => {
          if (result.isConfirmed) {
            let data = JSON.stringify(res.result);
            localStorage.setItem('user', data);
            location.assign('/admin');
          }
        });
      }
    });
  }
}
