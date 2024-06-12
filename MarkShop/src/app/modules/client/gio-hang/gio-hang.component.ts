import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { IListGioHang } from 'src/app/models/giohang';
@Component({
  selector: 'app-gio-hang',
  templateUrl: './gio-hang.component.html',
  styleUrls: ['./gio-hang.component.css']
})
export class GioHangComponent implements OnInit {
  ListGioHang: IListGioHang[] = [];
  SoLuong: number = 0;
  TongGia: number = 0;
  constructor(private cartSrv: CartService, private router: Router) { }
  ngOnInit(): void {
    this.cartSrv.cartUpdated.subscribe(() => {
      this.loadGioHang();
    });
    this.loadGioHang();
  }
  //Load giỏ hàng
  loadGioHang() {
    const cart = this.cartSrv.loadGioHang();
    this.ListGioHang = cart.cart;
    this.SoLuong = cart.SoLuong;
    this.TongGia = cart.TongGia;
  }

  // Tăng số lượng sản phẩm trong giỏ hàng
  tangGioHang(MaSanPham: number) {
    this.cartSrv.tangGioHang(MaSanPham)
  }

  // giảm số lượng sản phẩm trong giỏ hàng
  giamGioHang(MaSanPham: number) {
    this.cartSrv.giamGioHang(MaSanPham)
  }

  // Xóa sản phẩm khỏi giỏ hàng
  deleteGioHang(MaSanPham: number) {
    this.cartSrv.deleteGioHang(MaSanPham)
  }
  deleteAllGioHang() {
    this.cartSrv.deleteAllGioHang();
  }
  //Thanh toán
  thanhToan() {
    const user = localStorage.getItem('user');
    if (!user) {
      Swal.fire({
        title: 'Thông báo',
        text: 'Bạn chưa đăng nhập. Vui lòng đăng nhập để thanh toán.',
        icon: 'warning'
      });
      return;
    }

    const cart = localStorage.getItem('cart');
    if (!cart || JSON.parse(cart).length === 0) {
      Swal.fire({
        title: 'Thông báo',
        text: 'Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.',
        icon: 'warning',
      });
      return;
    }
    location.assign('/thanh-toan');
  }

}

