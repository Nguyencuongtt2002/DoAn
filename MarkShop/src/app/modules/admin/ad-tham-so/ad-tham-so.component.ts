import { OnInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ThamSoService } from 'src/app/services/thamso.service';
import { ToastrService } from 'ngx-toastr';
import { ThamSo } from 'src/app/models/thamso';

@Component({
  selector: 'app-ad-tham-so',
  templateUrl: './ad-tham-so.component.html',
  styleUrls: ['./ad-tham-so.component.css']
})
export class AdThamSoComponent implements OnInit {
  Listthamso: Array<ThamSo> = new Array<ThamSo>();
  MaThamSo: number = 0
  TenThamSo: string = '';
  KyHieu: string = '';
  NoiDung: string = '';
  Anh: any = null;

  p: number = 1;
  pageSize: number = 1;
  totalItems: number = 0;
  @ViewChild('addModal') addModal!: ElementRef;
  @ViewChild('updateModal') updateModal!: ElementRef;
  @ViewChild('deleteModal') deleteModal!: ElementRef;
  constructor(
    private ts: ThamSoService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getall();
  }
  taomoi() {
    this.TenThamSo = '';
    this.KyHieu = '';
    this.NoiDung = '';
    this.Anh = '';
    this.selectedRow = null
  }
  getall = () => {
    this.ts.getThamSoALL().subscribe(res => {
      this.Listthamso = res;

    })
  }

  Them = () => {
    const formData = new FormData();
    formData.append('tenThamSo', this.TenThamSo);
    formData.append('kyHieu', this.KyHieu);
    formData.append('noiDung', this.NoiDung);
    if (this.Anh) {
      formData.append('file', this.Anh!);
    }
    this.ts.create(formData).subscribe(
      (res) => {
        if (res) {
          this.toastr.success('Thêm thành công', '', {
            progressBar: true,
          });
          this.getall();
          const addModal = this.addModal.nativeElement;
          addModal.classList.remove('show');
          addModal.style.display = 'none';
          document.body.classList.remove('modal-open');

          const modalBackdrop = document.getElementsByClassName('modal-backdrop');
          for (let i = 0; i < modalBackdrop.length; i++) {
            modalBackdrop[i].remove();
          }
        }
      },
      (error) => {
        this.toastr.error('Đã xảy ra lỗi khi thêm .', '', {
          progressBar: true,
        });;

      }
    );
  }
  selectedRow: ThamSo | null = null;

  onRowClick(thamso: ThamSo) {
    this.selectedRow = thamso;
    this.MaThamSo = this.selectedRow.maThamSo;
    this.TenThamSo = this.selectedRow.tenThamSo;
    this.KyHieu = this.selectedRow.kyHieu;
    this.NoiDung = this.selectedRow.noiDung;
  }


  //Sửa
  update() {
    if (this.selectedRow) {
      // Tạo một đối tượng từ dữ liệu được chọn
      const formData = new FormData();
      formData.append('maThamSo', String(this.MaThamSo))
      formData.append('tenThamSo', this.TenThamSo);
      formData.append('kyHieu', this.KyHieu);
      formData.append('noiDung', this.NoiDung);
      formData.append('file', this.Anh!);
      this.ts.update(formData).subscribe(res => {
        this.toastr.success('cập nhật thành công', '', {
          progressBar: true,
        });
        this.getall();
        // Đóng modal khi tạo thành công
        const updateModal = this.updateModal.nativeElement;
        updateModal.classList.remove('show');
        updateModal.style.display = 'none';
        document.body.classList.remove('modal-open');
        const modalBackdrop = document.getElementsByClassName('modal-backdrop');
        for (let i = 0; i < modalBackdrop.length; i++) {
          modalBackdrop[i].remove();
        }
        this.selectedRow = null
      });

    }
  }

  // onDelete = () => {
  //   this.deleteModal.nativeElement.classList.add('show');
  // }

  // hanleDelete = () => {
  //   if (this.selectedRow) {
  //     // Thực hiện xóa dữ liệu
  //     this.lh.Delete(this.MaLienHe).subscribe((res) => {
  //       this.toastr.success('xóa thành công', '', {
  //         progressBar: true,
  //       });
  //       this.getall(this.p);
  //       const deleteModal = this.deleteModal.nativeElement;
  //       deleteModal.classList.remove('show');
  //       deleteModal.style.display = 'none';
  //       document.body.classList.remove('modal-open');
  //       const modalBackdrop = document.getElementsByClassName('modal-backdrop');
  //       for (let i = 0; i < modalBackdrop.length; i++) {
  //         modalBackdrop[i].remove();
  //       }
  //     });
  //   }

  // }

  //File
  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.Anh = fileList[0];
    }
  }

}

