import { Component, OnInit } from '@angular/core';
import { NguoidungService } from 'src/app/services/nguoidung.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dang-ky',
  templateUrl: './dang-ky.component.html',
  styleUrls: ['./dang-ky.component.css']
})
export class DangKyComponent implements OnInit {
  TaiKhoan: string = "";
  MatKhau: string = "";
  Email: string = "";
  HoTen: string = "";
  NgaySinh: any;
  DiaChi: string = "";
  SoDienThoai: string = "";
  GioiTinh: string = "Nam";
  VaiTro: string = 'Khách hàng';
  constructor(private nd: NguoidungService) { }

  ngOnInit(): void { }
  Register() {
    // Perform validation checks
    if (
      !this.TaiKhoan ||
      !this.MatKhau ||
      !this.Email ||
      !this.HoTen ||
      !this.isValidEmail(this.Email) ||
      (this.SoDienThoai && !this.isValidPhoneNumber(this.SoDienThoai))
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'Vui lòng điền thông tin hợp lệ và điền đầy đủ các trường bắt buộc'
      });
      return; // Exit the function if required fields are empty or invalid
    }
    const formData: any = new FormData();
    formData.append('taiKhoan', this.TaiKhoan);
    formData.append('matKhau', this.MatKhau)
    formData.append('email', this.Email);
    formData.append('hoTen', this.HoTen);
    formData.append('ngaySinh', this.NgaySinh);
    formData.append('gioiTinh', this.GioiTinh);
    formData.append('diaChi', this.DiaChi);
    formData.append('SoDienThoai', this.SoDienThoai);
    formData.append('anhDaiDien', 'avatar.jpg');
    formData.append('vaiTro', this.VaiTro)

    this.nd.kiemtra(formData).subscribe(res => {
      console.log(res)
      if (!res.data || res.length === 0) {
        this.nd.createUser(formData).subscribe(res => {
          if (res) {
            // Use Swal for success message
            Swal.fire({
              icon: 'success',
              title: 'Đăng ký thành công',
            }).then((result) => {
              if (result.isConfirmed) {
                location.assign('/Dang-nhap-user');
              }
            });
          }
        });
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'Tài khoản hoặc email bạn nhập đã tồn tại .Vui lòng nhập lại !'
        });
      }
    })
  }

  // Helper function to check if the email is valid
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Helper function to check if the phone number is valid
  isValidPhoneNumber(phoneNumber: string): boolean {
    // You can add more sophisticated validation for phone numbers if needed
    return /^\d{10,}$/g.test(phoneNumber);
  }
}
