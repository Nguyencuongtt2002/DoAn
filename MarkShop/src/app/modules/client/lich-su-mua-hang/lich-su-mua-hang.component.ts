import { Component, OnInit } from '@angular/core';
import { DonhangService } from 'src/app/services/donhang.service';
import { Loaisanpham } from 'src/app/models/loaisanpham';
import { LoaisanphamService } from 'src/app/services/loaisanpham.service';
import { NguoidungService } from 'src/app/services/nguoidung.service';
import Swal from 'sweetalert2';
import { Lienhe } from 'src/app/models/lienhe';
import { PaymentInformation } from 'src/app/models/vnpay';
@Component({
  selector: 'app-lich-su-mua-hang',
  templateUrl: './lich-su-mua-hang.component.html',
  styleUrls: ['./lich-su-mua-hang.component.css']
})
export class LichSuMuaHangComponent implements OnInit {
  lichSuMuaHang: any[] = [];
  loaisp: Array<Loaisanpham> = new Array<Loaisanpham>();
  HoTen: string = "";
  DiaChi: string = "";
  SoDienThoai: string = "";
  Tonghoadon: number = 0;
  MaDonHang: number = 0;
  TenSP: string = '';
  SoLuong: number = 0;
  GiaTien: number = 0;
  TinhTrang: number = 0;
  lienhe: Array<Lienhe> = new Array<Lienhe>();
  constructor(private donhangService: DonhangService, private loaisanpham: LoaisanphamService, private nd: NguoidungService) { }

  ngOnInit(): void {
    this.lichsumuahang();
    this.getLoaiSanPham();
  }
  getLoaiSanPham = () => {
    this.loaisanpham.getLoaiSanPhamAll().subscribe(res => {
      this.loaisp = res;
    })
  }
  lichsumuahang() {
    const loggedInUser = this.nd.checkLogin();
    if (loggedInUser) {
      this.donhangService.getLichSuMuaHang(loggedInUser.maNguoiDung).subscribe(data => {
        this.lichSuMuaHang = data.data;
      });
    } else {
      console.log('Người dùng chưa đăng nhập');
    }
  }
  huyDon(MaDonHang: number, MaSanPham: number) {
    const obj = {
      maDonHang: MaDonHang,
      maSanPham: MaSanPham
    };
    console.log(obj)
    Swal.fire({
      title: 'Thông báo',
      text: 'Bạn có chắc chắn muốn xoá đơn hàng  này không?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xoá'
    }).then((result) => {
      if (result.isConfirmed) {
        this.donhangService.huyDon(obj).subscribe((res) => {
          console.log(res)
          Swal.fire({
            title: 'Thông báo',
            text: 'đơn hàng đã xoá khỏi hệ thống',
            icon: 'success'
          }).then(() => {
            // Sau khi xác nhận thông báo, cập nhật lại lịch sử mua hàng
            this.lichsumuahang();
          });
        });
      }
    });

  }
  XemChiTiet(donhang: any) {
    this.HoTen = donhang.hoTen;
    this.DiaChi = donhang.diaChi;
    this.SoDienThoai = donhang.soDienThoai
    this.MaDonHang = donhang.maDonHang
    this.TinhTrang = donhang.tinhTrang
    const lienhe = {
      page: 1,
      pageSize: 1,
      email: '',
      soDienThoai: ""
    }
    this.donhangService.getlienheAll(lienhe).subscribe(res => {
      this.lienhe = res.data;
    })

    const obj = {
      maDonHang: donhang.maDonHang,
      maSanPham: donhang.maSanPham
    }
    this.donhangService.getChiTietDonHangByDonHang(obj).subscribe(data => {
      console.log(data.data)
      this.MaDonHang = data?.data[0].maDonHang
      this.TenSP = data?.data[0].tenSP;
      this.SoLuong = data?.data[0].soLuong;
      this.GiaTien = data?.data[0].giaTien;
      this.Tonghoadon = this.SoLuong * this.GiaTien;
    })


  }
  daNhanHang = (MaDonHang: number, MaSanPham: number) => {
    const obj = {
      maDonHang: MaDonHang,
      maSanPham: MaSanPham,
      tinhTrang: 5,
      trangThai: 5
    }

    Swal.fire({
      title: 'Xác nhận',
      text: `Bạn có chắc chắn muốn nhận  sản phẩm có mã ${MaSanPham} của đơn hàng ${MaDonHang} này?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.donhangService.capNhatDonHangKhiGiao(obj).subscribe(res => {
          Swal.fire({
            title: 'Thông báo',
            text: 'Cảm ơn bạn đã mua hàng tại shop',
            icon: 'success'
          }).then(() => {
            this.lichsumuahang();
          });
        })
      }
    })
  }
  //Thanh toán online
  vnPay = (id: number) => {
    const payment: PaymentInformation = {
      orderId: id,
      name: this.HoTen,
      amount: this.Tonghoadon,
      orderDescription: '',
      orderType: "other",
      url: `${window.location.origin}/camon`
    }

    this.donhangService.vnpay(payment).subscribe(res => {
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

