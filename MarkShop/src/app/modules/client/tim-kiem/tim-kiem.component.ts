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
  product: Array<Sanpham> = [];
  loaisp: Array<Loaisanpham> = [];
  p: number = 1;
  timkiem: string = '';
  listSanPhamSearch: Sanpham[] = [];
  pageSize: number = 9;
  MinGia: any;
  MaxGia: any;

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
    this.getsanphamsearch();
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
  getsanphamsearch() {
    this._route.queryParams.subscribe((params) => {
      this.timkiem = params['tensanpham'];
      this.MinGia = params['MinGia'];
      this.MaxGia = params['MaxGia'];

      const obj = {
        page: 1,
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
      console.log(obj);
      this.sp.TimKiem(obj).subscribe((res) => {
        this.listSanPhamSearch = res.data;
        console.log(this.listSanPhamSearch);
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


