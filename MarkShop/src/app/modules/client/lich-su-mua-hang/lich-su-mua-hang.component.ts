import { Component, OnInit } from '@angular/core';
import { DonhangService } from 'src/app/services/donhang.service';
import { Loaisanpham } from 'src/app/models/loaisanpham';
import { LoaisanphamService } from 'src/app/services/loaisanpham.service';
import { NguoidungService } from 'src/app/services/nguoidung.service';
import Swal from 'sweetalert2';
import { Lienhe } from 'src/app/models/lienhe';
import { PaymentInformation } from 'src/app/models/vnpay';
import { ChiTietDonHang, Donhang } from 'src/app/models/donhang';
@Component({
  selector: 'app-lich-su-mua-hang',
  templateUrl: './lich-su-mua-hang.component.html',
  styleUrls: ['./lich-su-mua-hang.component.css']
})
export class LichSuMuaHangComponent implements OnInit {
  lichSuMuaHang: Donhang[] = [];
  loaisp: Array<Loaisanpham> = new Array<Loaisanpham>();
  HoTen: string = "";
  DiaChi: string = "";
  SoDienThoai: string = "";
  Tonghoadon: number = 0;
  MaDonHang: number = 0;
  chitietdonhang: ChiTietDonHang[] = [];
  TinhTrang: number = 0;
  lienhe: Array<Lienhe> = new Array<Lienhe>();
  constructor(private donhangService: DonhangService, private loaisanpham: LoaisanphamService, private nd: NguoidungService) { }

  ngOnInit(): void {
    this.lichsumuahang();
    this.getLoaiSanPham();
  }
  getLoaiSanPham = () => {
    const obj = {
      page: 1,
      pageSize: 10,
      tenLoaiSanPham: ""
    }
    this.loaisanpham.getLoaiSanPhamAll(obj).subscribe(res => {
      this.loaisp = res.data;
    })
  }
  lichsumuahang() {
    const loggedInUser = this.nd.checkLogin();
    if (loggedInUser) {
      this.donhangService.getLichSuMuaHang(loggedInUser.maNguoiDung).subscribe(data => {
        this.lichSuMuaHang = data.data;
      });
    }
  }
  huyDon = (item: ChiTietDonHang) => {
    const obj = {
      maDonHang: item.maDonHang,
      maSanPham: item.maSanPham
    };
    Swal.fire({
      title: 'Thông báo',
      text: 'Bạn có chắc chắn muốn hủy đơn hàng  này không?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        this.donhangService.huyDon(obj).subscribe((res) => {
          Swal.fire({
            title: 'Thông báo',
            text: 'đơn hàng đã hủy khỏi hệ thống',
            icon: 'success'
          }).then(() => {
            this.donhangService.getChiTietDonHangByDonHang(item.maDonHang).subscribe(data => {
              this.chitietdonhang = data?.data
              if (this.chitietdonhang.length === 0) {
                this.Tonghoadon = 0;
              }
              else {
                this.donhangService.getTheoMa(item.maDonHang).subscribe(data => {
                  this.Tonghoadon = data.tongTien;
                })
              }
              this.lichsumuahang();
            })
          });
        });
      }
    });

  }
  XemChiTiet(donhang: Donhang) {
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

    this.donhangService.getChiTietDonHangByDonHang(donhang.maDonHang).subscribe(data => {
      this.chitietdonhang = data?.data
      this.donhangService.getTheoMa(donhang.maDonHang).subscribe(data => {
        this.Tonghoadon = data.tongTien;
      })
    })
  }
  Xacnhanhoanthanh(MaDonHang: number) {
    const obj = {
      maDonHang: MaDonHang,
      tinhTrang: 6,
    }

    Swal.fire({
      title: 'Xác nhận',
      text: `Bạn có chắc chắn muốn nhận đơn hàng này không ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.donhangService.capNhatDonHang(obj).subscribe(res => {
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

