import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NguoidungService } from 'src/app/services/nguoidung.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadScriptService } from 'src/app/services/loadscript.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  kiemtradangnhap: any;
  AnhDaiDien: any = null;
  HoTen: string = "";
  isFeatActive: boolean = false;
  isServActive: boolean = false;
  isSanphamActive: boolean = false;
  isDonviActive: boolean = false;

  constructor(
    private router: Router,
    private nd: NguoidungService,
    private authSrv: AuthService,
    private load2: LoadScriptService
  ) { }

  ngOnInit() {
    this.kiemtradangnhap = this.nd.checkLogin();
    if (this.kiemtradangnhap) {
      this.AnhDaiDien = this.kiemtradangnhap.anhDaiDien;
      this.HoTen = this.kiemtradangnhap.hoTen;
    }
    this.loadJS();
  }

  private async loadJS(): Promise<void> {
    await this.load2.loadScript('/assets/JS/jquery-3.5.1.min.js');
    await this.load2.loadScript('/assets/JS/jquery.countup.min.js');
    await this.load2.loadScript('/assets/JS/jquery.validate.min.js');
    await this.load2.loadScript('/assets/JS/jquery.validate.unobtrusive.min.js');
    await this.load2.loadScript('/assets/JS/index.js');
  }

  logout() {
    this.authSrv.logout();
  }

  thongke() {
    this.router.navigate(['/admin']);
  }

  nguoidung() {
    this.router.navigate(['/admin/ad-nguoidung']);
  }

  toggleFeat() {
    this.isFeatActive = !this.isFeatActive;
  }

  toggleSanpham() {
    this.isSanphamActive = !this.isSanphamActive;
  }

  toggleDonvi() {
    this.isDonviActive = !this.isDonviActive;
  }

  toggleServ() {
    this.isServActive = !this.isServActive;
  }
}
