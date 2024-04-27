import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/client/home/home.component';
import { LayoutClientComponent } from './layout/template/layout-client/layout-client.component';
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
import { LayoutAdminComponent } from './layout/template/layout-admin/layout-admin.component';
import { AuthGuard } from './services/guard.service';
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
import { CamOnComponent } from './modules/client/cam-on/cam-on.component';
import { ConfirmComponent } from './modules/client/confirm/confirm.component';
import { AdThamSoComponent } from './modules/admin/ad-tham-so/ad-tham-so.component';


const routes: Routes = [
  {
    path: '', component: LayoutClientComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        title: 'Trang chủ'
      },
      {
        path: 'XemChiTiet/:id',
        component: XemChiTietComponent,
        title: 'XemChiTiet'
      },
      {
        path: 'SanPhamTheoLoai/:MaLoaiSanPham',
        component: DanhMucComponent
      },
      {
        path: 'gioithieu',
        component: GioiThieuComponent,
        title: 'Giới thiệu'
      },
      {
        path: 'lienhe',
        component: LienHeComponent,
        title: 'Liên hệ'
      },
      {
        path: 'thuonghieu/:id',
        component: ThuongHieuComponent,
        title: 'Thương hiệu'
      },
      {
        path: 'tintuc',
        component: TinTucComponent
      },
      {
        path: 'gio-hang',
        component: GioHangComponent,
        title: 'Giỏ hàng '
      },
      {
        path: 'tai-khoan',
        component: TaiKhoanComponent,
      },
      {
        path: 'thanh-toan',
        component: ThanhToanComponent,
        title: 'Thanh toán',
        canActivate: [AuthGuard],
      },
      {
        path: 'lich-su',
        component: LichSuMuaHangComponent,
        title: 'Lịch sử mua hàng '
      },
      {
        path: 'CTTinTuc/:MaTinTuc',
        component: ChiTietTinTucComponent
      },
      {
        path: 'tim-kiem',
        component: TimKiemComponent,
        title: 'Tìm kiếm'
      },
      {
        path: 'sanpham',
        component: SanPhamComponent,
        title: 'sản phẩm'
      },
      {
        path: 'camon',
        component: CamOnComponent,
        title: 'cảm ơn'
      },
      {
        path: 'confirm',
        component: ConfirmComponent,
      }
    ],

  },
  {
    path: 'admin', component: LayoutAdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ThongKeComponent,
        title: 'Thống kê'
      },
      {
        path: 'ad-loaisp',
        component: AdLoaispComponent,
        title: 'Admin'
      },
      {
        path: 'ad-thuonghieu',
        component: AdThuongHieuComponent,
        title: 'Admin'
      },
      {
        path: 'ad-nhacungcap',
        component: AdNhaCungCapComponent,
        title: 'Admin'
      },
      {
        path: 'ad-menu',
        component: AdMenuComponent,
        title: 'Admin',
      },
      {
        path: 'ad-lienhe',
        component: AdLienHeComponent,
        title: 'Admin'
      },
      {
        path: 'ad-gioithieu',
        component: AdGioiThieuComponent,
        title: 'Admin',
      },
      {
        path: 'ad-size',
        component: AdSizeComponent,
        title: 'Admin',
      },
      {
        path: 'ad-slide',
        component: AdSlideComponent,
        title: 'Admin'
      },
      {
        path: 'ad-donhang',
        component: AdDonHangComponent,
        title: 'Admin'
      },
      {
        path: 'ad-tintuc',
        component: AdTinTucComponent,
        title: 'Admin'
      },
      {
        path: 'ad-nguoidung',
        component: AdNguoiDungComponent,
        title: 'Admin'
      },
      {
        path: 'ad-sanpham',
        component: AdSanPhamComponent,
        title: 'Admin'
      },
      {
        path: 'ad-hoadonnhap',
        component: AdHoaDonNhapComponent,
        title: 'Admin'
      },
      {
        path: 'ad-thamso',
        component: AdThamSoComponent,
        title: 'Admin'
      }
    ],

  },
  {
    path: 'Dang-nhap-user',
    component: DangNhapUserComponent,
    title: 'Đăng nhập '
  },
  {
    path: 'dang-nhap-admin',
    component: DangNhapAdminComponent,
    title: 'Quản trị viên'
  },
  {
    path: 'Dang-Ky', component: DangKyComponent
  },
  {
    path: '**',
    component: ErrorComponentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
