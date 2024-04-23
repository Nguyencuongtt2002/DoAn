import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SanphamService } from 'src/app/services/sanpham.service';
import { LoaisanphamService } from 'src/app/services/loaisanpham.service';
import { Sanpham } from 'src/app/models/sanpham';
import { Loaisanpham } from 'src/app/models/loaisanpham';
import { Router } from '@angular/router';
import { LoadScriptService } from 'src/app/services/loadscript.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-tim-kiem',
  templateUrl: './tim-kiem.component.html',
  styleUrls: ['./tim-kiem.component.css']
})
export class TimKiemComponent implements OnInit {
  loaisp: Array<Loaisanpham> = [];
  timkiem: string = '';
  listSanPhamSearch: any;
  MinGia: any;
  MaxGia: any;
  p: number = 1;
  pageSize: number = 9;
  totalItems: number = 0;
  constructor(
    private _route: ActivatedRoute,
    private sp: SanphamService,
    private loaisanpham: LoaisanphamService,
    private router: Router,
    private load2: LoadScriptService,
    private cartSrv: CartService,

  ) { }

  ngOnInit(): void {
    this.getLoaiSanPhamAll();
    this.getsanphamsearch(this.p);
    this.loadJS();
  }
  getLoaiSanPhamAll = () => {
    const obj = {
      page: 1,
      pageSize: 50,
      tenLoaiSanPham: ""
    }
    this.loaisanpham.getLoaiSanPhamAll(obj).subscribe(res => {
      this.loaisp = res.data;
    })
  }
  private async loadJS(): Promise<void> {
    await this.load2.loadScript('/assets/JS/jquery-3.5.1.min.js')
    await this.load2.loadScript('/assets/JS/index.js')
  }
  // Lấy sản phẩm tìm kiếm
  getsanphamsearch = (p: number) => {
    this._route.queryParams.subscribe((params) => {
      this.timkiem = params['tensanpham'];
      this.MinGia = params['MinGia'];
      this.MaxGia = params['MaxGia'];

      const obj = {
        page: p,
        pageSize: this.pageSize,
        maSanPham: null,
        tenSP: this.timkiem || '',
        tenThuongHieu: '',
        tenLoaiSanPham: '',
        minGia: this.MinGia || null,
        maxGia: this.MaxGia || null,
        maLoaiSanPham: null,
        maThuongHieu: null,
      };
      this.sp.TimKiem(obj).subscribe((res) => {
        console.log(res)
        this.listSanPhamSearch = res?.data;
        this.totalItems = res.totalItems;
        this.p = p
        console.log(this.p)
      });
    });
  }
  Themvaogio = (MaSanPham: number) => {
    this.cartSrv.Themvaogio(MaSanPham, 1)
  }

  nuttimkiem() {
    // Đảm bảo truyền giá trị 'tensanpham' vào queryParams
    this.router.navigate(['/tim-kiem'], { queryParams: { 'tensanpham': this.timkiem } });
  }

}


