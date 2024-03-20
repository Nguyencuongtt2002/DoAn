import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThuongHieuService } from 'src/app/services/thuonghieu.service';
import { ThuongHieu } from 'src/app/models/thuonghieu';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { LoadScriptService } from 'src/app/services/loadscript.service';

@Component({
  selector: 'app-ad-thuong-hieu',
  templateUrl: './ad-thuong-hieu.component.html',
  styleUrls: ['./ad-thuong-hieu.component.css']
})
export class AdThuongHieuComponent implements OnInit {
  thuonghieu: Array<ThuongHieu> = new Array<ThuongHieu>();
  MaThuongHieu: number = 0;
  TenThuongHieu: string = "";
  GioiThieu: string = "";
  btnText: string = "Thêm";
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
  p: number = 1
  constructor(
    private _route: ActivatedRoute,
    private th: ThuongHieuService,
    private toastr: ToastrService,
    private load2: LoadScriptService
  ) { }
  ngOnInit(): void {
    this.getAll();
    this.loadJS();
  }
  taomoi = () => {
    this.TenThuongHieu = "";
    this.GioiThieu = "";
    this.btnText = "Thêm";
  }
  getAll = () => {
    this.th.getThuongHieuAll().subscribe(res => {
      console.log(res);
      this.thuonghieu = res;
    })
  }
  CreateUpdate = () => {
    const obj = {
      maThuongHieu: this.MaThuongHieu,
      tenThuongHieu: this.TenThuongHieu,
      gioiThieu: this.GioiThieu
    };
    if (this.btnText === "Thêm") {
      this.th.create(obj).subscribe(res => {
        if (res) {
          this.toastr.success('Thêm thành công', '', {
            progressBar: true,
          });
          this.getAll();
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
      this.th.update(obj).subscribe(res => {
        this.toastr.success('cập nhật thành công', '', {
          progressBar: true,
        });
        this.getAll();
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
    console.log(item)
    this.btnText = 'Cập nhật';
    this.MaThuongHieu = item.maThuongHieu;
    this.TenThuongHieu = item.tenThuongHieu;
    this.GioiThieu = item.gioiThieu
  }
  onDelete = (item: any) => {
    this.MaThuongHieu = item.maThuongHieu;
    this.deleteModal.nativeElement.classList.add('show');
  }

  hanleDelete = () => {
    // Thực hiện xóa dữ liệu
    this.th.Delete(this.MaThuongHieu).subscribe((res) => {
      this.toastr.success('xóa thành công', '', {
        progressBar: true,
      });
      this.getAll();
      const deleteModal = this.deleteModal.nativeElement;
      deleteModal.classList.remove('show');
      deleteModal.style.display = 'none';
      document.body.classList.remove('modal-open');
      const modalBackdrop = document.getElementsByClassName('modal-backdrop');
      for (let i = 0; i < modalBackdrop.length; i++) {
        modalBackdrop[i].remove();
      }
    });
  }
  private async loadJS(): Promise<void> {
    await this.load2.loadScript('/assets/JS/jquery-3.5.1.min.js')
    await this.load2.loadScript('/assets/JS/jquery.countup.min.js')
    await this.load2.loadScript('/assets/JS/jquery.validate.min.js')
    await this.load2.loadScript('/assets/JS/jquery.validate.unobtrusive.min.js')
    await this.load2.loadScript('/assets/JS/index.js')
  }
}


