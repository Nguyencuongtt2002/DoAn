import { Component, OnInit } from '@angular/core';
import { SanphamService } from 'src/app/services/sanpham.service';
import { Sanpham } from 'src/app/models/sanpham'
import { Loaisanpham } from 'src/app/models/loaisanpham';
import { LoaisanphamService } from 'src/app/services/loaisanpham.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-san-pham',
  templateUrl: './san-pham.component.html',
  styleUrls: ['./san-pham.component.css']
})
export class SanPhamComponent implements OnInit {
  p: number = 1;
  timkiem: string = '';
  listloai: Loaisanpham[] = [];
  listSPALL: Sanpham[] = [];
  constructor(
    private sanphamSrv: SanphamService,
    private loaisanphamService: LoaisanphamService,
    private cartSrv: CartService,
    private _router: Router
  ) { }
  ngOnInit(): void {
    this.getLoaiSanPhamAll();
    this.getSanPhamAll();
  }
  getLoaiSanPhamAll = () => {
    const obj = {
      page: 1,
      pageSize: 50,
      tenLoaiSanPham: ""
    }
    this.loaisanphamService.getLoaiSanPhamAll(obj).subscribe(res => {
      this.listloai = res.data;
    })
  }
  getSanPhamAll() {
    const obj = {
      page: this.p,
      pageSize: 20,
      tenSP: ''
    }
    this.sanphamSrv.getSPAll(obj).subscribe(res => {
      this.listSPALL = res.data;
    })
  }
  //Thêm vào giỏ hàng
  Themvaogio = (MaSanPham: number) => {
    this.cartSrv.Themvaogio(MaSanPham, 1)
  }
  nuttimkiem = () => {
    this._router.navigate(['/tim-kiem'], { queryParams: { 'tensanpham': this.timkiem } });
  }
  searchGia = (MinGia: any, MaxGia: any) => {
    if (MinGia == 0 || MinGia == null) { MinGia = null }
    if (MaxGia == 0 || MaxGia == null) { MaxGia = null }
    this._router.navigate(['/tim-kiem'], { queryParams: { 'MinGia': MinGia, 'MaxGia': MaxGia } });
  }
}
