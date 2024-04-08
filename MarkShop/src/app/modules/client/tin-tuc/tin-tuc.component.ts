import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tintuc } from 'src/app/models/tintuc';
import { TintucService } from 'src/app/services/tintuc.service';
import { LoadScriptService } from 'src/app/services/loadscript.service';
import { Loaisanpham } from 'src/app/models/loaisanpham';
import { LoaisanphamService } from 'src/app/services/loaisanpham.service';
@Component({
  selector: 'app-tin-tuc',
  templateUrl: './tin-tuc.component.html',
  styleUrls: ['./tin-tuc.component.css']
})
export class TinTucComponent implements OnInit {
  tintuc: Array<Tintuc> = [];
  p: number = 1;
  pageSize: number = 2;
  loaisp: Array<Loaisanpham> = new Array<Loaisanpham>();
  constructor(
    private _route: ActivatedRoute,
    private tt: TintucService,
    private load2: LoadScriptService,
    private loaisanpham: LoaisanphamService) { }

  ngOnInit(): void {
    this.getLoaiSanPhamAll();
    this.getTinTucAll();
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
  getTinTucAll = () => {
    const obj = {
      page: this.p,
      pageSize: this.pageSize
    }
    this.tt.getTinTucAll(obj).subscribe(res => {
      this.tintuc = res.data;
    })
  }
  private async loadJS(): Promise<void> {
    await this.load2.loadScript('/assets/JS/jquery-3.5.1.min.js')
    await this.load2.loadScript('/assets/JS/index.js')
  }

}

