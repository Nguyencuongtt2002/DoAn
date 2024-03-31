import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutClientComponent } from './layout/template/layout-client/layout-client.component';
import { LayoutAdminComponent } from './layout/template/layout-admin/layout-admin.component';
import { HeaderComponent } from './layout/client/header/header.component';
import { FooterComponent } from './layout/client/footer/footer.component';
import { HomeComponent } from './modules/client/home/home.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrModule } from 'ngx-toastr';
import { XemChiTietComponent } from './modules/client/xem-chi-tiet/xem-chi-tiet.component';
import { DanhMucComponent } from './modules/client/danh-muc/danh-muc.component';
import { GioiThieuComponent } from './modules/client/gioi-thieu/gioi-thieu.component';
import { LienHeComponent } from './modules/client/lien-he/lien-he.component';
import { ThuongHieuComponent } from './modules/client/thuong-hieu/thuong-hieu.component';
import { TinTucComponent } from './modules/client/tin-tuc/tin-tuc.component';
import { GioHangComponent } from './modules/client/gio-hang/gio-hang.component';
import { DangNhapUserComponent } from './dang-nhap-user/dang-nhap-user.component';
import { TaiKhoanComponent } from './modules/client/tai-khoan/tai-khoan.component';
import { DangKyComponent } from './dang-ky/dang-ky.component';
import { DangNhapAdminComponent } from './dang-nhap-admin/dang-nhap-admin.component';
import { SidebarComponent } from './layout/admin/sidebar/sidebar.component';
import { AdLoaispComponent } from './modules/admin/ad-loaisp/ad-loaisp.component';
import { AdThuongHieuComponent } from './modules/admin/ad-thuong-hieu/ad-thuong-hieu.component';
import { AdNhaCungCapComponent } from './modules/admin/ad-nha-cung-cap/ad-nha-cung-cap.component';
import { AdMenuComponent } from './modules/admin/ad-menu/ad-menu.component';
import { AdLienHeComponent } from './modules/admin/ad-lien-he/ad-lien-he.component';
import { ThanhToanComponent } from './modules/client/thanh-toan/thanh-toan.component';
import { ThongKeComponent } from './modules/admin/thong-ke/thong-ke.component';
import { AdGioiThieuComponent } from './modules/admin/ad-gioi-thieu/ad-gioi-thieu.component';
import { AdSizeComponent } from './modules/admin/ad-size/ad-size.component';
import { AdSlideComponent } from './modules/admin/ad-slide/ad-slide.component';
import { LichSuMuaHangComponent } from './modules/client/lich-su-mua-hang/lich-su-mua-hang.component';
import { AdDonHangComponent } from './modules/admin/ad-don-hang/ad-don-hang.component';
import { AdTinTucComponent } from './modules/admin/ad-tin-tuc/ad-tin-tuc.component';
import { AdNguoiDungComponent } from './modules/admin/ad-nguoi-dung/ad-nguoi-dung.component';
import { AdSanPhamComponent } from './modules/admin/ad-san-pham/ad-san-pham.component';
import { AdHoaDonNhapComponent } from './modules/admin/ad-hoa-don-nhap/ad-hoa-don-nhap.component';
import { ChiTietTinTucComponent } from './modules/client/chi-tiet-tin-tuc/chi-tiet-tin-tuc.component';
import { TimKiemComponent } from './modules/client/tim-kiem/tim-kiem.component';
import { SanPhamComponent } from './modules/client/san-pham/san-pham.component';
import { ErrorComponentComponent } from './error-component/error-component.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CamOnComponent } from './modules/client/cam-on/cam-on.component';


@NgModule({
  declarations: [
    AppComponent, LayoutClientComponent, LayoutAdminComponent, HeaderComponent, FooterComponent, HomeComponent,
    XemChiTietComponent, DanhMucComponent, GioiThieuComponent, LienHeComponent, ThuongHieuComponent, TinTucComponent,
    GioHangComponent, DangNhapUserComponent, TaiKhoanComponent, DangKyComponent, DangNhapAdminComponent,
    SidebarComponent, AdLoaispComponent, AdThuongHieuComponent, AdNhaCungCapComponent, AdMenuComponent,
    AdLienHeComponent, ThanhToanComponent, ThongKeComponent, AdGioiThieuComponent, AdSizeComponent,
    AdSlideComponent, LichSuMuaHangComponent, AdDonHangComponent, AdTinTucComponent, AdNguoiDungComponent, AdSanPhamComponent,
    AdHoaDonNhapComponent, ChiTietTinTucComponent, TimKiemComponent, SanPhamComponent, ErrorComponentComponent, CamOnComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, HttpClientModule, CarouselModule, BrowserAnimationsModule,
    FormsModule, AngularEditorModule,
    NgxPaginationModule, ToastrModule.forRoot({ preventDuplicates: true }),
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
