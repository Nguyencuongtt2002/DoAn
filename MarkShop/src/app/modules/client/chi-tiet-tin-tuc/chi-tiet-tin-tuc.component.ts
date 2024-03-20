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


    this.MaTinTuc = Number(this._route.snapshot.paramMap.get('MaTinTuc'));
    this.tt.getOne(this.MaTinTuc).subscribe(data => {
      this.tintuc = data;
      console.log(this.tintuc.listjson_NoiDungCT)
    })


    this.tt.getTinTucKhac(this.MaTinTuc).subscribe(data => {
      this.tintuckhac = data.data;
    })
    this.loaisanphamService.getLoaiSanPhamAll().subscribe(res => {
      this.loaisp = res;
    })
  }
}
