import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SlideService } from 'src/app/services/slide.service';
import { Slide } from 'src/app/models/slide';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ad-slide',
  templateUrl: './ad-slide.component.html',
  styleUrls: ['./ad-slide.component.css']
})
export class AdSlideComponent implements OnInit {
  slide: Array<Slide> = new Array<Slide>();
  MaSlide: any;
  Anh: any = "";
  btnText: string = "Thêm";
  p: number = 1
  @ViewChild('CreateUpdateModal') CreateUpdateModal!: ElementRef;
  @ViewChild('deleteModal') deleteModal!: ElementRef;
  constructor(
    private sl: SlideService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getAll();
  }
  getAll = () => {
    this.sl.getSlideAll().subscribe(res => {
      this.slide = res;
    })
  }
  taomoi() {
    this.Anh = "";
    this.btnText = "Thêm";
  }
  CreateUpdate() {

    if (this.btnText === "Thêm") {
      const formData = new FormData();
      formData.append('file', this.Anh!);
      this.sl.create(formData).subscribe(res => {
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
      formData.append('maSlide', this.MaSlide);
      formData.append('file', this.Anh!);
      // Issue might be here
      this.sl.update(formData).subscribe(res => {
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
  CapNhat(item: any) {
    this.btnText = 'Cập nhật';
    this.MaSlide = item.maSlide
  }
  onDelete = (item: any) => {
    this.MaSlide = item.maSlide;
    this.deleteModal.nativeElement.classList.add('show');
  }

  hanleDelete = () => {
    // Thực hiện xóa dữ liệu
    this.sl.detele(this.MaSlide).subscribe((res) => {
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
      this.Anh = fileList[0];
    }
  }
}




