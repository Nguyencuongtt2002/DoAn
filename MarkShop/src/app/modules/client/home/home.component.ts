import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SanphamService } from 'src/app/services/sanpham.service';
import { Sanpham } from 'src/app/models/sanpham';
import { CartService } from 'src/app/services/cart.service';
import { LoadScriptService } from 'src/app/services/loadscript.service';
import { SlideService } from 'src/app/services/slide.service';
import { Slide } from 'src/app/models/slide';
import { ToastrService } from 'ngx-toastr';
import { Anh } from 'src/app/models/anh';
import { AnhService } from 'src/app/services/anh.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentTab: string = 'clothesForMen';

  chuyenTab(tabName: string) {
    this.currentTab = tabName;
  }

  customOptions: OwlOptions = {
    loop: true,
    margin: 10,
    nav: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 3000,
    smartSpeed: 1000,
    dots: false,
    navText: ['<span><i class="fas fa-chevron-left"></i></span>', '<span><i class="fas fa-chevron-right"></i></span>'],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 3
      },
      1000: {
        items: 5
      }
    }
  };
  ListAnh: Array<Anh> = new Array<Anh>();
  sanphammoi: Array<Sanpham> = new Array<Sanpham>();
  sanphambanchay: Array<Sanpham> = new Array<Sanpham>();
  sanphamgiamgia: Array<Sanpham> = new Array<Sanpham>();
  slides: Array<Slide> = new Array<Slide>();
  constructor(
    private sp: SanphamService,
    private cartSrv: CartService,
    private load2: LoadScriptService,
    private slide: SlideService,
    private anh: AnhService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    //Sản phẩm mới 
    this.SanPhamMoi();
    // sản phẩm bán chạy 
    this.SanPhamBanChay();
    //sản phẩm bán chạy
    this.SanPhamGiamGia();
    // lấy tất cả slide 
    this.getSlideAll();
    // Lấy tất Cả ảnh 
    this.getAnhAll();
    this.loadJS()
  }
  SanPhamMoi = () => {
    this.sp.getSanPhamMoi().subscribe(res => {
      this.sanphammoi = res;
    })
  }
  SanPhamBanChay = () => {
    this.sp.getSanPhamBanChay().subscribe(res => {
      this.sanphambanchay = res;
    })
  }
  SanPhamGiamGia = () => {
    this.sp.getSanPhamgiamgia().subscribe(res => {
      this.sanphamgiamgia = res;
    })
  }
  getSlideAll = () => {
    //lấy tất cả slides
    this.slide.getSlideAll().subscribe(res => {
      this.slides = res;
    })
  }
  getAnhAll = () => {
    this.anh.getAllAnh().subscribe(res => {
      this.ListAnh = res
    })
  }
  //Thêm vào giỏ hàng
  Themvaogio = (MaSanPham: number) => {
    this.cartSrv.Themvaogio(MaSanPham, 1)
  }

  private async loadJS(): Promise<void> {
    await this.load2.loadScript('/assets/JS/jquery-3.5.1.min.js')
    await this.load2.loadScript('/assets/JS/index.js')
  }
}
