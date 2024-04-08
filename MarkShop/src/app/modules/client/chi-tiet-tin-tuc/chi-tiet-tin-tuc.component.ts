import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tintuc } from 'src/app/models/tintuc';
import { TintucService } from 'src/app/services/tintuc.service';
import { Loaisanpham } from 'src/app/models/loaisanpham';
import { LoaisanphamService } from 'src/app/services/loaisanpham.service';

@Component({
  selector: 'app-chi-tiet-tin-tuc',
  templateUrl: './chi-tiet-tin-tuc.component.html',
  styleUrls: ['./chi-tiet-tin-tuc.component.css']
})
export class ChiTietTinTucComponent implements OnInit {
  MaTinTuc: number = 0;
  tintuckhac: Tintuc[] = [];
  tintuc: any;
  loaisp: Array<Loaisanpham> = new Array<Loaisanpham>();
  constructor(private _route: ActivatedRoute, private tt: TintucService, private loaisanphamService: LoaisanphamService) { }

  ngOnInit(): void {


    this._route.params.subscribe(params => {
      const ma = +params['MaTinTuc'];
      this.tt.getOne(ma).subscribe(data => {
        this.tintuc = data;
      })
      this.tt.getTinTucKhac(ma).subscribe(data => {
        this.tintuckhac = data.data;
      })
    });

    this.getLoaiSanPhamAll();
  }
  getLoaiSanPhamAll = () => {
    const obj = {
      page: 1,
      pageSize: 50,
      tenLoaiSanPham: ""
    }
    this.loaisanphamService.getLoaiSanPhamAll(obj).subscribe(res => {
      this.loaisp = res.data;
    })
  }
}
