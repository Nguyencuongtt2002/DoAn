import { Component, OnInit } from '@angular/core';
import { DonhangService } from 'src/app/services/donhang.service';
import { Loaisanpham } from 'src/app/models/loaisanpham';
import { LoaisanphamService } from 'src/app/services/loaisanpham.service';
import { NguoidungService } from 'src/app/services/nguoidung.service';
import Swal from 'sweetalert2';
import { Lienhe } from 'src/app/models/lienhe';

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

  lienhe: Array<Lienhe> = new Array<Lienhe>();
  constructor(private donhangService: DonhangService, private loaisanpham: LoaisanphamService, private nd: NguoidungService) { }

  ngOnInit(): void {
    this.lichsumuahang();
    this.getLoaiSanPham();
  }
  getLoaiSanPham = () => {
    this.loaisanpham.getLoaiSanPhamAll().subscribe(res => {
      console.log(res)
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
      this.MaDonHang = data.data.maDonHang
      this.TenSP = data.data.tenSP;
      this.SoLuong = data.data.soLuong;
      this.GiaTien = data.data.giaTien;
      this.Tonghoadon = this.SoLuong * this.GiaTien;
      console.log(this.TenSP)
    })


  }
}

