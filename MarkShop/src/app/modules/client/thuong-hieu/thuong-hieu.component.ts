import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThuongHieuService } from 'src/app/services/thuonghieu.service';
import { Sanpham } from 'src/app/models/sanpham';
import { ThuongHieu } from 'src/app/models/thuonghieu';

@Component({
  selector: 'app-thuong-hieu',
  templateUrl: './thuong-hieu.component.html',
  styleUrls: ['./thuong-hieu.component.css']
})
export class ThuongHieuComponent implements OnInit {
  listSPtheoTH: Array<Sanpham> = new Array<Sanpham>(); // Assuming Sanpham is an array type
  MaLoaiSanPham: number = 0;
  thuonghieu: Array<ThuongHieu> = new Array<ThuongHieu>();
  constructor(private route: ActivatedRoute, private thuonghieuService: ThuongHieuService) { }

  ngOnInit(): void {
    this.LoadSPtheoTH();
  }

  LoadSPtheoTH = () => {
    this.route.params.subscribe(params => {
      const ma = +params['id'];
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
      this.thuonghieuService.getSanPhamTheoTH(obj).subscribe(res => {
        this.listSPtheoTH = res.data;
      });
    });
    this.thuonghieuService.getThuongHieuAll().subscribe(res => {
      //console.log(res);
      this.thuonghieu = res;
    })
  }
}
