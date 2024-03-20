import { Component, OnInit } from '@angular/core';
import { SanphamService } from 'src/app/services/sanpham.service';
import { Sanpham } from 'src/app/models/sanpham'
import { Loaisanpham } from 'src/app/models/loaisanpham';
import { LoaisanphamService } from 'src/app/services/loaisanpham.service';

@Component({
  selector: 'app-san-pham',
  templateUrl: './san-pham.component.html',
  styleUrls: ['./san-pham.component.css']
})
export class SanPhamComponent implements OnInit {
  p: number = 1;
  listloai: Loaisanpham[] = [];
  listSPALL: Sanpham[] = [];
  constructor(private sanphamSrv: SanphamService, private loaisanphamService: LoaisanphamService) { }
  ngOnInit(): void {
    this.getLoaiSanPhamAll();
    this.getSanPhamAll();
  }
  getLoaiSanPhamAll() {
    this.loaisanphamService.getLoaiSanPhamAll().subscribe(res => {
      console.log(res);
      this.listloai = res;
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
}
