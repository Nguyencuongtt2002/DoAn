import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DonhangService } from 'src/app/services/donhang.service';
import { Donhang } from 'src/app/models/donhang';
import { Lienhe } from 'src/app/models/lienhe'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ad-don-hang',
  templateUrl: './ad-don-hang.component.html',
  styleUrls: ['./ad-don-hang.component.css']
})
export class AdDonHangComponent implements OnInit {
  donhang: Array<Donhang> = new Array<Donhang>();
  lienhe: any;
  HoTen: string = "";
  DiaChi: string = "";
  SoDienThoai: string = "";
  chitietdonhang: any;
  NgayDat: Date = new Date();
  NgayGiao: Date = new Date();
  Tonghoadon: number = 0;
  TongTien: number = 0;

  MaDonHang: number = 0;
  MaSanPham: number = 0;
  TenSP: string = '';
  SoLuong: number = 0;
  GiaTien: number = 0
  constructor(private _route: ActivatedRoute, private donhangSrv: DonhangService) { }

  ngOnInit(): void {
    this.getDonHangAll();
    this.getLienHeAll();
  }
  getLienHeAll = () => {
    const obj = {
      page: 1,
      pageSize: 2,
      email: "",
      soDienThoai: ""
    }
    this.donhangSrv.getlienheAll(obj).subscribe(res => {
      this.lienhe = res.data;
    })
  }
  getDonHangAll() {
    this.donhangSrv.getDonHangAll().subscribe(res => {
      this.donhang = res;

      // Tính tổng doanh thu sau khi lấy được danh sách đơn hàng
      this.tongDoanhThu()
    });
  }
  tongDoanhThu() {
    // Duyệt qua mỗi đơn hàng trong mảng donhang
    this.donhang.forEach(dh => {
      // Kiểm tra điều kiện tinhTrang và trangThai
      if (dh.tinhTrang === 5 && dh.trangThai === 5) {
        const obj = {
          maDonHang: dh.maDonHang,
          maSanPham: dh.maSanPham
        };

        // Gọi service để lấy thông tin chi tiết đơn hàng
        this.donhangSrv.getChiTietDonHangByDonHang(obj).subscribe(res => {
          this.chitietdonhang = res.data;
          this.GiaTien = this.chitietdonhang[0].giaTien;
          this.Tonghoadon = this.GiaTien * this.chitietdonhang[0].soLuong;
          console.log(res.data)
          // Cộng giá trị tổng hóa đơn vào tổng doanh thu
          this.TongTien += this.Tonghoadon;
        });
      }
    });
  }
  getChiTietDonHang(MaDonHang: number, MaSanPham: number) {
    const obj = {
      maDonHang: MaDonHang,
      maSanPham: MaSanPham
    }
    this.donhangSrv.getChiTietDonHangByDonHang(obj).subscribe(res => {
      this.chitietdonhang = res.data;
      console.log(this.chitietdonhang)
      this.MaDonHang = this.chitietdonhang[0].maDonHang
      this.TenSP = this.chitietdonhang[0].tenSP
      this.SoLuong = this.chitietdonhang[0].soLuong
      this.GiaTien = this.chitietdonhang[0].giaTien
      this.Tonghoadon = this.GiaTien * this.SoLuong
    });
  }

  DuyetDon(item: any) {
    Swal.fire({
      title: 'Thông báo',
      text: 'Bạn có chắc chắn duyệt đơn hàng này không?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Duyệt'
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked "Duyệt"
        const obj = {
          maDonHang: item.maDonHang,
          maSanPham: item.maSanPham
        }
        this.donhangSrv.DuyetDon(obj).subscribe(res => {
          // Assuming the AJAX request is successful
          Swal.fire({
            title: 'Thông báo',
            text: 'Đơn hàng đã được duyệt',
            icon: 'success'
          }).then(() => {
            location.reload();
          });
        });
      }
    });
  }

  selectedRow: Donhang | null = null;

  onRowClick(donhang: Donhang) {
    this.selectedRow = donhang;
    this.HoTen = this.selectedRow.hoTen;
    this.DiaChi = this.selectedRow.diaChi;
    this.SoDienThoai = this.selectedRow.soDienThoai;
    // Clear previous total before calculating for the selected order
    this.getChiTietDonHang(this.selectedRow.maDonHang, this.selectedRow.maSanPham)
  }

  exportToExcel() {
    const maDonHang = Number(this.selectedRow?.maDonHang);
    const maSanPham = Number(this.selectedRow?.maSanPham);
    const obj = { maDonHang, maSanPham }
    this.donhangSrv.excel(obj).subscribe((data: Blob) => {
      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = `donhang${maSanPham}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, error => {
      console.error('Đã xảy ra lỗi khi xuất Excel:', error);
      // Xử lý lỗi
    });
  }
}



