import { OnInit, Component } from '@angular/core';
import { NguoidungService } from 'src/app/services/nguoidung.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadScriptService } from 'src/app/services/loadscript.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  kiemtradangnhap: any;
  AnhDaiDien: any = null;
  HoTen: string = ""
  constructor(private nd: NguoidungService, private authSrv: AuthService, private load2: LoadScriptService) { }
  ngOnInit() {
    this.kiemtradangnhap = this.nd.checkLogin();
    if (this.kiemtradangnhap) {
      this.AnhDaiDien = this.kiemtradangnhap.anhDaiDien;
      this.HoTen = this.kiemtradangnhap.hoTen;
    }
    this.loadJS()
  }
  private async loadJS(): Promise<void> {
    await this.load2.loadScript('/assets/JS/jquery-3.5.1.min.js')
    await this.load2.loadScript('/assets/JS/jquery.countup.min.js')
    await this.load2.loadScript('/assets/JS/jquery.validate.min.js')
    await this.load2.loadScript('/assets/JS/jquery.validate.unobtrusive.min.js')
    await this.load2.loadScript('/assets/JS/index.js')
  }
  logout() {
    this.authSrv.logout();
  }
  thongke() {
    window.location.href = '/admin/'
  }
  nguoidung() {
    window.location.href = '/admin/ad-nguoidung'
  }
}
