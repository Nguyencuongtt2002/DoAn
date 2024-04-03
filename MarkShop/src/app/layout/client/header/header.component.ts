import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { Menu } from 'src/app/models/menu';
import { CartService } from 'src/app/services/cart.service';
import { NguoidungService } from 'src/app/services/nguoidung.service';
import { ThamSo } from 'src/app/models/thamso';
import { ThamSoService } from 'src/app/services/thamso.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  SoLuong: number = 0;
  TongGia: number = 0;
  menu: Array<Menu> = new Array<Menu>();;
  isLogin: any;
  logo: ThamSo = new ThamSo();
  constructor(
    private menuService: MenuService,
    private nd: NguoidungService,
    private cartSrv: CartService,
    private thamsoService: ThamSoService) { }

  ngOnInit(): void {
    this.loadThamSo();
    //lấy tất cả menu
    this.getMenuAll();
    this.cartSrv.cartUpdated.subscribe(() => {
      this.loadGioHang();
    });
    this.isLogin = this.nd.checkLogin();
    this.loadGioHang();
  }
  onLogout() {
    localStorage.clear();
    location.assign('/');
  }
  // lấy tất cả menu 
  getMenuAll = () => {
    const obj = {
      page: 1,
      pageSize: 10,
      tenMenu: ""
    }
    this.menuService.getAll(obj).subscribe(res => {
      this.menu = res.data
    })
  }
  //Load giỏ hàng header
  loadGioHang = () => {
    var cart = this.cartSrv.loadGioHang();
    this.SoLuong = cart.SoLuong;
    this.TongGia = cart.TongGia;
  }

  loadThamSo = () => {
    this.thamsoService.getByKyHieu("LOGO").subscribe(res => {
      this.logo = res
    });
  }
}
