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
  pageSize: number = 10;
  totalItems: number = 0;
  constructor(private _router: Router, private route: ActivatedRoute, private loaisanphamService: LoaisanphamService) { }

  ngOnInit(): void {
    this.LoadSPtheoloai(this.p);

  }
  LoadSPtheoloai = (p: number) => {
    this.route.params.subscribe(params => {
      const ma = +params['MaLoaiSanPham'];
      const obj = {
        page: p,
        pageSize: this.pageSize,
        maSanPham: null,
        tenSP: this.timkiem || '',
        tenThuongHieu: '',
        tenLoaiSanPham: '',
        minGia: null,
        maxGia: null,
        maLoaiSanPham: ma,
        maThuongHieu: null,
      };
      this.loaisanphamService.getSanPhamTheoLoai(obj).subscribe(res => {
        this.listSPtheoloai = res.data;
        this.totalItems = res.totalItems;
        this.p = p
      });
    });

    const obj = {
      page: 1,
      pageSize: 50,
      tenLoaiSanPham: ""
    }
    this.loaisanphamService.getLoaiSanPhamAll(obj).subscribe(res => {

      console.log(res)
      this.loaisp = res.data;
    })
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
