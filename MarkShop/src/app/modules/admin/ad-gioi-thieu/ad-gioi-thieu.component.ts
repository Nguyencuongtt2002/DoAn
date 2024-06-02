import { OnInit, Component, ElementRef, ViewChild } from '@angular/core';
import { GioiThieuService } from 'src/app/services/gioithieu.service';
import { Gioithieu } from 'src/app/models/gioithieu'
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-ad-gioi-thieu',
  templateUrl: './ad-gioi-thieu.component.html',
  styleUrls: ['./ad-gioi-thieu.component.css']
})
export class AdGioiThieuComponent implements OnInit {
  gioithieu: Array<Gioithieu> = new Array<Gioithieu>();
  MaGioiThieu: number = 0
  TieuDe: string = '';
  NoiDung: string = '';
  HinhAnh: any = "";
  searchTerm: string = '';

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '125px',
    minHeight: '125px',
    placeholder: 'Nhập nội dung',
    translate: 'no',
  };


  @ViewChild('addModal') addModal!: ElementRef;
  @ViewChild('updateModal') updateModal!: ElementRef;
  @ViewChild('deleteModal') deleteModal!: ElementRef;
  constructor(
    private gt: GioiThieuService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getall();
  }
  taomoi = () => {
    this.TieuDe = '';
    this.NoiDung = '';
    this.HinhAnh = '';
    this.selectedRow = null;
  }
  getall = () => {
    this.gt.getGioiThieuAll().subscribe(res => {
      this.gioithieu = res;
    })
  }
  // Them = () => {
  //   const formData = new FormData();
  //   formData.append('TieuDe', this.TieuDe);
  //   formData.append('NoiDung', this.NoiDung);
  //   formData.append('file', this.HinhAnh!);

  //   this.gt.create(formData).subscribe(
  //     (res) => {
  //       if (res) {
  //         this.toastr.success('Thêm thành công', '', {
  //           progressBar: true,
  //         });
  //         this.getall();
  //         const addModal = this.addModal.nativeElement;
  //         addModal.classList.remove('show');
  //         addModal.style.display = 'none';
  //         document.body.classList.remove('modal-open');

  //         const modalBackdrop = document.getElementsByClassName('modal-backdrop');
  //         for (let i = 0; i < modalBackdrop.length; i++) {
  //           modalBackdrop[i].remove();
  //         }
  //       }
  //     },
  //     (error) => {
  //       this.toastr.error('Đã xảy ra lỗi khi thêm .', '', {
  //         progressBar: true,
  //       });;

  //     }
  //   );
  // }
  selectedRow: Gioithieu | null = null;

  onRowClick = (gioithieu: Gioithieu) => {
    this.selectedRow = gioithieu;
    this.MaGioiThieu = this.selectedRow.maGioiThieu;
    this.TieuDe = this.selectedRow.tieuDe;
    this.NoiDung = this.selectedRow.noiDung;
    this.HinhAnh = this.selectedRow.hinhAnh;
  }


  //Sửa
  update = () => {
    if (this.selectedRow) {
      // Tạo một đối tượng từ dữ liệu được chọn
      const formData = new FormData();
      formData.append('maGioiThieu', String(this.MaGioiThieu));
      formData.append('tieuDe', this.TieuDe);
      formData.append('noiDung', this.NoiDung);
      formData.append('file', this.HinhAnh!);
      // Sử dụng Swal cho thông báo thành công
      this.gt.update(formData).subscribe(res => {
        this.toastr.success('cập nhật thành công', '', {
          progressBar: true,
        });
        this.getall();
        // Đóng modal khi cập nhật thành công
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
  //     this.gt.Delete(this.MaGioiThieu).subscribe((res) => {
  //       this.toastr.success('xóa thành công', '', {
  //         progressBar: true,
  //       });
  //       this.getall();
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
      this.HinhAnh = fileList[0];
    }
  }

}
