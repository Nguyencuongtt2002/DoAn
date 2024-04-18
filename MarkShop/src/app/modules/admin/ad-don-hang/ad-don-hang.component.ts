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
  lienhe: Array<Lienhe> = new Array<Lienhe>();
  HoTen: string = "";
  DiaChi: string = "";
  SoDienThoai: string = "";
  chitietdonhang: any;
  NgayDat: Date = new Date();
  NgayGiao: Date = new Date();
  Tonghoadon: number = 0;
  MaDonHang: number = 0;
  MaSanPham: number = 0;
  TongTien: number = 0;
  constructor(
    private _route: ActivatedRoute,
    private donhangSrv: DonhangService
  ) { }

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
    });
  }

  getChiTietDonHang(MaDonHang: number) {
    this.donhangSrv.getChiTietDonHangByDonHang(MaDonHang).subscribe(res => {
      this.chitietdonhang = res?.data;
      this.donhangSrv.getTheoMa(MaDonHang).subscribe(data => {
        this.Tonghoadon = data.tongTien;
      })
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
        this.donhangSrv.DuyetDon(item.maDonHang).subscribe(res => {
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
    this.getChiTietDonHang(this.selectedRow.maDonHang)
  }

  exportToExcel() {
    const maDonHang = Number(this.selectedRow?.maDonHang);
    this.donhangSrv.excel(maDonHang).subscribe((data: Blob) => {
      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = `donhang${maDonHang}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, error => {
      console.error('Đã xảy ra lỗi khi xuất Excel:', error);
      // Xử lý lỗi
    });
  }
}



