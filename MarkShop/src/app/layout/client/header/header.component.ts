import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { Menu } from 'src/app/models/menu';
import { CartService } from 'src/app/services/cart.service';
import { NguoidungService } from 'src/app/services/nguoidung.service';
import { ThamSo } from 'src/app/models/thamso';
import { ThamSoService } from 'src/app/services/thamso.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  SoLuong: number = 0;
  TongGia: number = 0;
  menu: Array<Menu> = new Array<Menu>();
  isLogin: any;
  logo: ThamSo = new ThamSo();

  constructor(
    private menuService: MenuService,
    private nd: NguoidungService,
    private cartSrv: CartService,
    private thamsoService: ThamSoService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadThamSo();
    this.getMenuAll();
    this.cartSrv.cartUpdated.subscribe(() => {
      this.loadGioHang();
    });
    this.loadGioHang();
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isLogin = isAuthenticated ? this.authService.getCurrentUser() : null;
    });
  }

  onLogout() {
    this.authService.logout();
  }

  getMenuAll = () => {
    const obj = {
      page: 1,
      pageSize: 10,
      tenMenu: ""
    };
    this.menuService.getAll(obj).subscribe(res => {
      this.menu = res.data;
    });
  }

  loadGioHang = () => {
    var cart = this.cartSrv.loadGioHang();
    this.SoLuong = cart.SoLuong;
    this.TongGia = cart.TongGia;
  }

  loadThamSo = () => {
    this.thamsoService.getByKyHieu("LOGO").subscribe(res => {
      this.logo = res;
    });
  }

  taiKhoan = () => {
    location.assign("/tai-khoan")
  }
}
