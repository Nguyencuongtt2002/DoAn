import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaisanphamService } from 'src/app/services/loaisanpham.service';
import { Loaisanpham } from 'src/app/models/loaisanpham';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { LoadScriptService } from 'src/app/services/loadscript.service';
@Component({
  selector: 'app-ad-loaisp',
  templateUrl: './ad-loaisp.component.html',
  styleUrls: ['./ad-loaisp.component.css']
})
export class AdLoaispComponent implements OnInit {
  loaisp: Array<Loaisanpham> = new Array<Loaisanpham>();
  MaLoaiSanPham: number = 0;
  TenLoaiSanPham: string = "";
  GioiThieu: string = "";
  btnText: string = "Thêm";

  searchTerm: string = '';
  p: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;

  @ViewChild('CreateUpdateModal') CreateUpdateModal!: ElementRef;
  @ViewChild('deleteModal') deleteModal!: ElementRef;
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '125px',
    minHeight: '125px',
    placeholder: 'Nhập nội dung',
    translate: 'no',
  };

  constructor(
    private _route: ActivatedRoute,
    private loaisanpham: LoaisanphamService,
    private toastr: ToastrService,
    private load2: LoadScriptService
  ) { }

  ngOnInit(): void {
    this.getAll(this.p);
    this.loadJS();
  }
  taomoi = () => {
    this.TenLoaiSanPham = "";
    this.GioiThieu = "";
    this.btnText = "Thêm";
  }
  getAll = (p: number) => {
    const obj = {
      page: p,
      pageSize: this.pageSize,
      tenLoaiSanPham: this.searchTerm
    }
    this.loaisanpham.getLoaiSanPhamAll(obj).subscribe(res => {
      this.loaisp = res.data;
      this.totalItems = res.totalItems;
      this.p = p
      // console.log(this.p)
    })
  }
  CreateUpdate = () => {
    const obj = {
      maLoaiSanPham: this.MaLoaiSanPham,
      tenLoaiSanPham: this.TenLoaiSanPham,
      gioiThieu: this.GioiThieu
    };
    if (this.btnText === "Thêm") {
      this.loaisanpham.create(obj).subscribe(res => {
        if (res) {
          this.toastr.success('Thêm thành công', '', {
            progressBar: true,
          });
          this.getAll(this.p);
          const CreateUpdateModal = this.CreateUpdateModal.nativeElement;
          CreateUpdateModal.classList.remove('show');
          CreateUpdateModal.style.display = 'none';
          document.body.classList.remove('modal-open');

          const modalBackdrop = document.getElementsByClassName('modal-backdrop');
          for (let i = 0; i < modalBackdrop.length; i++) {
            modalBackdrop[i].remove();
          }
        }
      });
    } else {
      this.loaisanpham.update(obj).subscribe(res => {
        this.toastr.success('cập nhật thành công', '', {
          progressBar: true,
        });
        this.getAll(this.p);
        const CreateUpdateModal = this.CreateUpdateModal.nativeElement;
        CreateUpdateModal.classList.remove('show');
        CreateUpdateModal.style.display = 'none';
        document.body.classList.remove('modal-open');

        const modalBackdrop = document.getElementsByClassName('modal-backdrop');
        for (let i = 0; i < modalBackdrop.length; i++) {
          modalBackdrop[i].remove();
        }
      });
    }
  }
  CapNhat = (item: any) => {
    console.log(item.gioiThieu)
    this.btnText = 'Cập nhật';
    this.MaLoaiSanPham = item.maLoaiSanPham;
    this.TenLoaiSanPham = item.tenLoaiSanPham;
    this.GioiThieu = item.gioiThieu
  }
  // onDelete = (item: any) => {
  //   this.MaLoaiSanPham = item.maLoaiSanPham;
  //   this.deleteModal.nativeElement.classList.add('show');
  // }

  // hanleDelete = () => {
  //   // Thực hiện xóa dữ liệu
  //   this.loaisanpham.Delete(this.MaLoaiSanPham).subscribe((res) => {
  //     this.toastr.success('xóa thành công', '', {
  //       progressBar: true,
  //     });
  //     this.getAll();
  //     const deleteModal = this.deleteModal.nativeElement;
  //     deleteModal.classList.remove('show');
  //     deleteModal.style.display = 'none';
  //     document.body.classList.remove('modal-open');
  //     const modalBackdrop = document.getElementsByClassName('modal-backdrop');
  //     for (let i = 0; i < modalBackdrop.length; i++) {
  //       modalBackdrop[i].remove();
  //     }
  //   });
  // }
  private async loadJS(): Promise<void> {
    await this.load2.loadScript('/assets/JS/jquery-3.5.1.min.js')
    await this.load2.loadScript('/assets/JS/jquery.countup.min.js')
    await this.load2.loadScript('/assets/JS/jquery.validate.min.js')
    await this.load2.loadScript('/assets/JS/jquery.validate.unobtrusive.min.js')
    await this.load2.loadScript('/assets/JS/index.js')
  }

}

