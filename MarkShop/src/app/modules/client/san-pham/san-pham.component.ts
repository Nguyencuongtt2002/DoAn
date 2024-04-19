import { Component, OnInit } from '@angular/core';
import { SanphamService } from 'src/app/services/sanpham.service';
import { Sanpham } from 'src/app/models/sanpham'
import { Loaisanpham } from 'src/app/models/loaisanpham';
import { LoaisanphamService } from 'src/app/services/loaisanpham.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-san-pham',
  templateUrl: './san-pham.component.html',
  styleUrls: ['./san-pham.component.css']
})
export class SanPhamComponent implements OnInit {
  p: number = 1;
  listloai: Loaisanpham[] = [];
  listSPALL: Sanpham[] = [];
  constructor(
    private sanphamSrv: SanphamService,
    private loaisanphamService: LoaisanphamService,
    private cartSrv: CartService
    ,
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
      console.log(res);
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
}
