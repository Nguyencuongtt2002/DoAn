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
  p: number = 1;
  pageSize: number = 3;
  totalItems: number = 0;
  constructor(private route: ActivatedRoute, private thuonghieuService: ThuongHieuService) { }

  ngOnInit(): void {
    this.LoadSPtheoTH(1);
  }

  LoadSPtheoTH = (page: number) => {
    this.route.params.subscribe(params => {
      const ma = +params['id'];
      this.thuonghieuService.getSanPhamTheoTH(page, this.pageSize, ma).subscribe(res => {
        this.listSPtheoTH = res.data;
        console.log(this.listSPtheoTH)
        this.p = page;
        this.totalItems = res.totalItems;
        console.log(this.totalItems);
      });
    });
    this.thuonghieuService.getThuongHieuAll().subscribe(res => {
      //console.log(res);
      this.thuonghieu = res;
    })
  }
}
