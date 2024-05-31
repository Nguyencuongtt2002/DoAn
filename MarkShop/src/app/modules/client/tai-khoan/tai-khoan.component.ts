import { Component, OnInit } from '@angular/core';
import { NguoidungService } from 'src/app/services/nguoidung.service';
import { Nguoidung } from 'src/app/models/nguoidung';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-tai-khoan',
  templateUrl: './tai-khoan.component.html',
  styleUrls: ['./tai-khoan.component.css']
})
export class TaiKhoanComponent implements OnInit {
  MatKhauCu: string = '';
  MatKhauMoi: string = '';
  NhapLaiMatKhauMoi: string = '';
  customerInfo: any;
  constructor(
    private nd: NguoidungService,
    private authSrv: AuthService,
    private toastr: ToastrService,
  ) { }
  ngOnInit(): void {
    this.customerInfo = this.nd.checkLogin();
    this.customerInfo.ngaySinh = this.formatDate(this.customerInfo.ngaySinh);
  }
  formatDate(date: string): string {
    const originalDate = new Date(date);
    originalDate.setDate(originalDate.getDate() + 1);
    const formattedDate = originalDate.toISOString().slice(0, 10);
    return formattedDate;
  }

  CapNhatThongTin() {
    if (!this.customerInfo.diaChi || !this.customerInfo.hoTen || !this.customerInfo.soDienThoai) {
      Swal.fire({
        icon: 'warning',
        title: 'Lỗi',
        text: 'Vui lòng điền đầy đủ thông tin',
      });
      return;
    }
    const formData = new FormData();
    formData.append('maNguoiDung', this.customerInfo.maNguoiDung);
    formData.append('email', this.customerInfo.email);
    formData.append('hoTen', this.customerInfo.hoTen);
    formData.append('ngaySinh', this.formatDate(this.customerInfo.ngaySinh));
    formData.append('gioiTinh', this.customerInfo.gioiTinh);
    formData.append('diaChi', this.customerInfo.diaChi);
    formData.append('soDienThoai', this.customerInfo.soDienThoai);
    formData.append('file', this.customerInfo.anhDaiDien!);

    if (this.MatKhauCu) {
      const check: any = {
        taiKhoan: this.customerInfo.taiKhoan,
        matKhau: this.MatKhauCu,
      };

      this.nd.login(check).subscribe(res => {
        if (res.code === 404) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Mật khẩu không chính xác',
          });
        } else {
          if (this.MatKhauMoi && this.NhapLaiMatKhauMoi) {
            if (this.MatKhauMoi === this.NhapLaiMatKhauMoi) {
              ////Đổi mật khẩu
              formData.append('matKhau', this.MatKhauMoi);
              console.log()
              this.nd.update(formData).subscribe(res => { });
              this.out();
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Mật khẩu mới không trùng khớp',
              });
            }
          }
          //Thay đổi thông tin
          else {
            this.nd.update(formData).subscribe(res => { });
            this.out()
          }
        }
      });
    }
    else {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Vui lòng nhập mật khẩu cũ để sửa thông tin',
      });
    }
  }


  out() {
    // Show success message
    this.toastr.success('Thay đổi thông tin thành công', 'Thông báo');
    let counter = 3;
    let countdownMessage: any = null;
    const intervalId = setInterval(() => {
      if (counter === 0) {
        clearInterval(intervalId);
        this.authSrv.logout();
      } else {
        if (countdownMessage) {
          this.toastr.clear(countdownMessage.toastId);
        }
        countdownMessage = this.toastr.info(`Website sẽ tự động đăng xuất sau ${counter} giây`, 'Thông báo');
        counter--;
      }
    }, 1000)
  }



  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.customerInfo.anhDaiDien = fileList[0];
    }
  }
}
