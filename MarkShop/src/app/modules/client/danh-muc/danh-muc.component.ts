import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaisanphamService } from 'src/app/services/loaisanpham.service';
import { Sanpham } from 'src/app/models/sanpham';
import { Loaisanpham } from 'src/app/models/loaisanpham';
import { Router } from '@angular/router';

@Component({
  selector: 'app-danh-muc',
  templateUrl: './danh-muc.component.html',
  styleUrls: ['./danh-muc.component.css']
})
export class DanhMucComponent implements OnInit {
  listSPtheoloai: Array<Sanpham> = new Array<Sanpham>(); // Assuming Sanpham is an array type
  loaisp: Array<Loaisanpham> = new Array<Loaisanpham>();
  timkiem: string = '';
  p: number = 1;
  pageSize: number = 3;
  totalItems: number = 0;
  constructor(private _router: Router, private route: ActivatedRoute, private loaisanphamService: LoaisanphamService) { }

  ngOnInit(): void {
    this.LoadSPtheoloai(1);

  }
  LoadSPtheoloai = (page: number) => {
    this.route.params.subscribe(params => {
      const ma = +params['MaLoaiSanPham'];
      this.loaisanphamService.getSanPhamTheoLoai(page, this.pageSize, ma).subscribe(res => {
        this.listSPtheoloai = res.data;
        console.log(this.listSPtheoloai)
        this.p = page;
        this.totalItems = res.totalItems;
        console.log(this.totalItems);
      });
    });
    this.loaisanphamService.getLoaiSanPhamAll().subscribe(res => {
      this.loaisp = res;
    })
  }
  nuttimkiem = () => {
    this._router.navigate(['/tim-kiem'], { queryParams: { 'tensanpham': this.timkiem } });
  }
  searchGia = (MinGia: any, MaxGia: any) => {
    if (MinGia == 0) { MinGia = null }
    if (MaxGia == 0) { MaxGia = null }
    this._router.navigate(['/tim-kiem'], { queryParams: { 'MinGia': MinGia, 'MaxGia': MaxGia } });
  }
}
