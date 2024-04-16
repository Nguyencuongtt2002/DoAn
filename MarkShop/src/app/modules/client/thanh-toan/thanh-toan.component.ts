import { Component, OnInit } from '@angular/core';
import { NguoidungService } from 'src/app/services/nguoidung.service';
import { DonhangService } from 'src/app/services/donhang.service';
import { Nguoidung } from 'src/app/models/nguoidung';
import Swal from 'sweetalert2';
import { PaymentInformation } from 'src/app/models/vnpay';
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
  phuongThucThanhToan: string = '';
  customerInfo: any;
  ListGioHang: any;
  SoLuong: number = 0;
  TongGia: number = 0;

  constructor(private nd: NguoidungService, private dh: DonhangService) { }

  ngOnInit(): void {
    this.loadGioHang();
    this.customerInfo = this.nd.checkLogin();
    if (this.customerInfo) {
      this.TenKhachHang = this.customerInfo.hoTen;
      this.DiaChi = this.customerInfo.diaChi;
      this.SoDienThoai = this.customerInfo.soDienThoai;
      this.Email = this.customerInfo.email;
      this.MaNguoiDung = this.customerInfo.maNguoiDung;
    }
  }

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
        text: 'Vui lòng chọn ngày giao hàng hợp lệ!',
        icon: 'error',
      });
      return false;
    }
    else if (this.phuongThucThanhToan === '') {
      Swal.fire({
        title: 'Thông báo',
        text: 'Vui lòng chọn phương thức thanh toán!',
        icon: 'error',
      });
      return false;
    }
    return true;
  }

  ThanhToan = () => {
    if (this.KiemTraThongTin()) {
      const obj: {
        hoTen: string,
        diaChi: string,
        soDienThoai: string,
        maNguoiDung: number,
        tinhTrang: number,
        phuongThucThanhToan: string,
        ngayGiao: Date;
        p_list_json_chitiet_hoadon: { maSanPham: number; soLuong: number; giaTien: number }[];
      } = {
        hoTen: this.TenKhachHang,
        diaChi: this.DiaChi,
        soDienThoai: this.SoDienThoai,
        maNguoiDung: this.MaNguoiDung,
        tinhTrang: this.phuongThucThanhToan === 'Chuyển khoản' ? 3 : 0,
        phuongThucThanhToan: this.phuongThucThanhToan,
        ngayGiao: this.NgayGiao,
        p_list_json_chitiet_hoadon: []
      };
      const danhSachSanPham = JSON.parse(localStorage.getItem('cart') || '[]');
      for (const sanpham of danhSachSanPham) {
        obj.p_list_json_chitiet_hoadon.push({
          maSanPham: sanpham.MaSanPham,
          soLuong: sanpham.SoLuong,
          giaTien: sanpham.DonGia,
        });
      }
      this.dh.thanhToan(obj).subscribe(
        () => {
          Swal.fire({
            title: 'Thông báo',
            text: 'Cảm ơn quý khách đã tin tưởng sản phẩm của shop.',
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              localStorage.removeItem('cart');
              if (this.phuongThucThanhToan === 'Thanh toán khi giao hàng') {
                this.dh.getNewDonHang().subscribe((res) => {
                  const email: any = {
                    email: this.customerInfo.email,
                    maDonHang: res.maDonHang
                  };
                  this.dh.orderEmail(email).subscribe(res => { });
                  location.href = '/'
                });
              }
              else if (this.phuongThucThanhToan === 'Chuyển khoản') {
                this.dh.getNewDonHang().subscribe((res) => {
                  const email: any = {
                    email: this.customerInfo.email,
                    maDonHang: res.maDonHang
                  };
                  this.dh.orderEmail(email).subscribe(res => { });
                  this.vnPay(res.maDonHang);
                });
              }
            }
          });
        },
        error => {
          Swal.fire('Lỗi', 'Đã xảy ra lỗi trong quá trình thanh toán', 'error');
        }
      );
    }
  }

  //Thanh toán online
  vnPay = (id: number) => {
    const payment: PaymentInformation = {
      orderId: id,
      name: this.TenKhachHang,
      amount: this.TongGia,
      orderDescription: '',
      orderType: "other",
      url: `${window.location.origin}/camon`
    }

    this.dh.vnpay(payment).subscribe(res => {
      if (res.success) {
        window.location.href = res.data;
      }
      else {
        Swal.fire({
          icon: 'warning',
          title: 'Cảnh báo',
          text: res.message
        });
      }
    });
  }
}
