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
  constructor(private _router: Router, private route: ActivatedRoute, private loaisanphamService: LoaisanphamService) { }

  ngOnInit(): void {
    this.LoadSPtheoloai();

  }
  LoadSPtheoloai = () => {
    this.route.params.subscribe(params => {
      const ma = +params['MaLoaiSanPham'];
      const obj = {
        page: 1,
        pageSize: 10,
        maSanPham: null,
        tenSanPham: '',
        tenThuongHiey: '',
        tenLoaiSanPham: '',
        minGia: null,
        maxGia: null,
        maThuongHieu: null,
        maLoaiSanPham: ma
      }
      this.loaisanphamService.getSanPhamTheoLoai(obj).subscribe(res => {
        this.listSPtheoloai = res.data;
        console.log(this.listSPtheoloai);
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
