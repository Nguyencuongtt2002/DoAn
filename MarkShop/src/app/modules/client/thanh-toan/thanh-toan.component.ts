import { Component, OnInit } from '@angular/core';
import { NguoidungService } from 'src/app/services/nguoidung.service';
import { DonhangService } from 'src/app/services/donhang.service';
import { Nguoidung } from 'src/app/models/nguoidung';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-thanh-toan',
  templateUrl: './thanh-toan.component.html',
  styleUrls: ['./thanh-toan.component.css']
})
export class ThanhToanComponent implements OnInit {
  MaNguoiDung: number = 0;
  TenKhachHang: string = '';
  DiaChi: string = '';
  NgayGiao: Date = new Date();
  SoDienThoai: string = '';
  Email: string = '';
  customerInfo: any;
  ListGioHang: any;
  SoLuong: number = 0;
  TongGia: number = 0;
  constructor(private nd: NguoidungService, private dh: DonhangService) { }
  ngOnInit(): void {
    this.loadGioHang();
    this.customerInfo = this.nd.checkLogin();
    if (this.customerInfo) {
      // If logged in, populate the input fields with customer information
      this.TenKhachHang = this.customerInfo.hoTen;
      this.DiaChi = this.customerInfo.diaChi;
      this.SoDienThoai = this.customerInfo.soDienThoai;
      this.Email = this.customerInfo.email;
      this.MaNguoiDung = this.customerInfo.maNguoiDung
    }
  }

  //Load giỏ hàng
  loadGioHang() {
    let cart: any[] = JSON.parse(localStorage.getItem('cart') || '[]');
    this.ListGioHang = cart;
    this.SoLuong = cart.reduce((total, item) => total + item.SoLuong, 0);
    this.TongGia = cart.reduce((total, item) => total + (item.DonGia * item.SoLuong), 0);

    if (this.SoLuong === 0) {
      Swal.fire({
        title: "Thông báo",
        text: "Bạn chưa mua sản phẩm nào, vui lòng quay lại sau",
        icon: "info",
      }).then(() => {
        window.location.href = '/';
      });
    }
  }

  KiemTraThongTin(): boolean {
    const ngaygiao = new Date(this.NgayGiao);
    if (!this.NgayGiao || this.NgayGiao === undefined || ngaygiao < new Date()) {
      Swal.fire({
        title: 'Thông báo',
        text: 'Vui lòng chọn ngày giao hàng hợp lệ !',
        icon: 'error',
      });
      return false;
    }
    return true;
  }

  ThanhToan() {
    if (this.KiemTraThongTin()) {
      const obj: {
        hoTen: string,
        diaChi: string,
        soDienThoai: string,
        maNguoiDung: number
        ngayGiao: Date;
        p_list_json_chitiet_hoadon: { maSanPham: number; soLuong: number; giaTien: number }[];
      } = {
        //trái trùng postman , phải khai báo trên 
        hoTen: this.TenKhachHang,
        diaChi: this.DiaChi,
        soDienThoai: this.SoDienThoai,
        maNguoiDung: this.MaNguoiDung,
        ngayGiao: this.NgayGiao,
        p_list_json_chitiet_hoadon: []
      };

      const danhSachSanPham: any[] = JSON.parse(localStorage.getItem('cart') || '[]');
      for (const sanpham of danhSachSanPham) {
        obj.p_list_json_chitiet_hoadon.push({
          maSanPham: sanpham.MaSanPham,
          soLuong: sanpham.SoLuong,
          giaTien: sanpham.DonGia
        });
      }

      this.dh.thanhToan(obj).subscribe(
        () => {
          Swal.fire('Thanh toán thành công', 'Cảm ơn quý khách đã tin tưởng sản phẩm của shop', 'success')
            .then((result) => {
              if (result.isConfirmed) {
                localStorage.removeItem('cart');
                location.assign('/');
              }
            });
        },
        error => {
          console.error('Error during payment:', error);
          Swal.fire('Lỗi', 'Đã xảy ra lỗi trong quá trình thanh toán', 'error');
        }
      );
    }

  }

}

