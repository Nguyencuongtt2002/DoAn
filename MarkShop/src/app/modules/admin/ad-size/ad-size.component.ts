import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SizeService } from 'src/app/services/size.service';
import { Size } from 'src/app/models/size';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { LoadScriptService } from 'src/app/services/loadscript.service';

@Component({
  selector: 'app-ad-size',
  templateUrl: './ad-size.component.html',
  styleUrls: ['./ad-size.component.css']
})
export class AdSizeComponent implements OnInit {
  listsize: Array<Size> = new Array<Size>();
  MaSize: number = 0;
  TenSize: string = "";
  MoTa: string = "";
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

  constructor(
    private _route: ActivatedRoute,
    private sz: SizeService,
    private toastr: ToastrService,
    private load2: LoadScriptService
  ) { }

  ngOnInit(): void {
    this.getAll();
    this.loadJS();
  }
  taomoi = () => {
    this.TenSize = "";
    this.MoTa = "";
    this.btnText = "Thêm";
  }
  getAll = () => {
    this.sz.getAll().subscribe(res => {
      this.listsize = res;
    })
  }
  CreateUpdate = () => {
    const obj = {
      maSize: this.MaSize,
      tenSize: this.TenSize,
      moTa: this.MoTa
    };
    if (this.btnText === "Thêm") {
      this.sz.create(obj).subscribe(res => {
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
      this.sz.update(obj).subscribe(res => {
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
    this.btnText = 'Cập nhật';
    this.MaSize = item.maSize;
    this.TenSize = item.tenSize;
    this.MoTa = item.moTa
  }
  onDelete = (item: any) => {
    this.MaSize = item.maSize;
    this.deleteModal.nativeElement.classList.add('show');
  }

  hanleDelete = () => {
    // Thực hiện xóa dữ liệu
    this.sz.Delete(this.MaSize).subscribe((res) => {
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


