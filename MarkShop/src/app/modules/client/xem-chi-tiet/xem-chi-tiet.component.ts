import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sanpham } from 'src/app/models/sanpham'
import { SanphamService } from 'src/app/services/sanpham.service';
import { data } from 'jquery';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CartService } from 'src/app/services/cart.service';
import { LoadScriptService } from 'src/app/services/loadscript.service';
import { Loaisanpham } from 'src/app/models/loaisanpham';
import { LoaisanphamService } from 'src/app/services/loaisanpham.service';

@Component({
  selector: 'app-xem-chi-tiet',
  templateUrl: './xem-chi-tiet.component.html',
  styleUrls: ['./xem-chi-tiet.component.css']
})
export class XemChiTietComponent implements OnInit {
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
  sanphamcungloai: Sanpham[] = [];
  product: any;
  loaisp: Array<Loaisanpham> = new Array<Loaisanpham>();
  soluong: number = 1
  constructor(
    private _route: ActivatedRoute,
    private sp: SanphamService,
    private loaisanpham: LoaisanphamService,
    private router: Router,
    private cartSrv: CartService,
    private load2: LoadScriptService
  ) { }

  ngOnInit(): void {
    this.ChiTiet()
    this.loadJS()
  }
  ChiTiet = () => {
    this._route.params.subscribe(params => {
      const ma = +params['id'];
      this.sp.getOne(ma).subscribe(res => {
        this.product = res
        this.loadSanPhamCungLoai();
      });
    });
    const obj = {
      page: 1,
      pageSize: 50,
      tenLoaiSanPham: ""
    }
    this.loaisanpham.getLoaiSanPhamAll(obj).subscribe(res => {
      this.loaisp = res.data;
    })

  }
  loadSanPhamCungLoai = () => {
    const obj = {
      maSanPham: this.product.maSanPham,
      maLoaiSanPham: this.product.maLoaiSanPham
    };

    this.sp.sanPhamCungLoai(obj).subscribe(res => {
      this.sanphamcungloai = res.data
    });
  }
  Themvaogio = (res: Sanpham, soluong: number) => {
    if (soluong <= 10) {
      this.cartSrv.Themvaogio(res.maSanPham, soluong);
    }
    else if (soluong > res.soLuong) {
      Swal.fire({
        icon: 'warning',
        title: 'Thông báo',
        text: 'Sản phẩm không đủ số lượng ',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
    }
    else {
      Swal.fire({
        icon: 'warning',
        title: 'Thông báo',
        text: 'Số lượng sản phẩm đặt mua không được vượt quá 10 sản phẩm',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
    }
  }

  private async loadJS(): Promise<void> {
    await this.load2.loadScript('/assets/JS/jquery-3.5.1.min.js')
    await this.load2.loadScript('/assets/JS/jquery.countup.min.js')
    await this.load2.loadScript('/assets/JS/jquery.validate.min.js')
    await this.load2.loadScript('/assets/JS/jquery.validate.unobtrusive.min.js')
    await this.load2.loadScript('/assets/JS/index.js')
  }
}
