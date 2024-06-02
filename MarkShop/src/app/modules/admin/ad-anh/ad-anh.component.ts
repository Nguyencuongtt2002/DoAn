import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnhService } from 'src/app/services/anh.service';
import { Anh } from 'src/app/models/anh';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ad-anh',
  templateUrl: './ad-anh.component.html',
  styleUrls: ['./ad-anh.component.css']
})
export class AdAnhComponent implements OnInit {
  ListAnh: Array<Anh> = new Array<Anh>();
  MaAnh: any;
  HinhAnh: any = "";
  TenHinhAnh: string = "";
  btnText: string = "Thêm";
  p: number = 1
  @ViewChild('CreateUpdateModal') CreateUpdateModal!: ElementRef;
  @ViewChild('deleteModal') deleteModal!: ElementRef;
  constructor(
    private anhSrv: AnhService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getAll();
  }
  getAll = () => {
    this.anhSrv.getAllAnh().subscribe(res => {
      this.ListAnh = res;
    })
  }
  taomoi() {
    this.TenHinhAnh = "";
    this.HinhAnh = "";
    this.btnText = "Thêm";
  }
  CreateUpdate() {

    if (this.btnText === "Thêm") {
      const formData = new FormData();
      formData.append('file', this.HinhAnh!);
      formData.append("tenHinhAnh", this.TenHinhAnh)
      this.anhSrv.create(formData).subscribe(res => {
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
      const formData = new FormData();
      formData.append('maAnh', this.MaAnh);
      formData.append('file', this.HinhAnh!);
      formData.append("tenHinhAnh", this.TenHinhAnh)
      // Issue might be here
      this.anhSrv.update(formData).subscribe(res => {
        this.toastr.success('cập nhật thành công', '', {
          progressBar: true,
        });
        this.HinhAnh = "";
        this.TenHinhAnh = "";
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
  CapNhat(item: Anh) {
    this.btnText = 'Cập nhật';
    this.MaAnh = item.maAnh
    this.TenHinhAnh = item.tenHinhAnh
  }
  onDelete = (item: any) => {
    this.MaAnh = item.maAnh;
    this.deleteModal.nativeElement.classList.add('show');
  }

  hanleDelete = () => {
    // Thực hiện xóa dữ liệu
    this.anhSrv.Delete(this.MaAnh).subscribe((res) => {
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
  //File
  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.HinhAnh = fileList[0];
    }
  }
}





