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
        console.log(this.product)
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
  Themvaogio = (res: any, soluong: number) => {
    console.log(res);
    if (soluong <= res.soLuong) {
      this.cartSrv.Themvaogio(res.maSanPham, soluong);
    }
    else if (res.soLuong == 0) {
      Swal.fire({
        icon: 'info',
        title: 'Sản phẩm đã hết hàng',
        text: 'Xin lỗi, sản phẩm này đã hết hàng. Vui lòng chọn sản phẩm khác.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
    }
    else {
      // Use Swal to show a warning message
      Swal.fire({
        icon: 'warning',
        title: 'Số lượng không hợp lệ',
        text: 'Không được mua vượt quá số lượng sản phẩm!',
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
