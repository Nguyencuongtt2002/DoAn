import { OnInit, Component, ElementRef, ViewChild } from '@angular/core';
import { TintucService } from 'src/app/services/tintuc.service';
import { Tintuc } from 'src/app/models/tintuc'
import Swal from 'sweetalert2';
import { NguoidungService } from 'src/app/services/nguoidung.service'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-ad-tin-tuc',
  templateUrl: './ad-tin-tuc.component.html',
  styleUrls: ['./ad-tin-tuc.component.css']
})
export class AdTinTucComponent implements OnInit {
  tintuc: Array<Tintuc> = new Array<Tintuc>();

  MaTinTuc: number = 0
  TieuDe: string = '';
  NoiDung: string = '';
  AnhTinTuc: any = '';
  NgayDang: string = '';
  user: any

  searchTerm: string = '';

  @ViewChild('addModal') addModal!: ElementRef;
  @ViewChild('updateModal') updateModal!: ElementRef;
  @ViewChild('deleteModal') deleteModal!: ElementRef;
  constructor(
    private tt: TintucService,
    private nd: NguoidungService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getall();
    this.user = this.nd.checkLogin();
  }
  taomoi() {
    this.TieuDe = '';
    this.NoiDung = '';
  }
  getall = () => {
    const obj = {
      page: 1,
      pageSize: 10
    }
    this.tt.getTinTucAll(obj).subscribe(res => {
      this.tintuc = res.data;
    })
  }
  Them = () => {
    const formData = new FormData();
    formData.append('tieuDe', this.TieuDe);
    formData.append('noiDung', this.NoiDung);
    formData.append('file', this.AnhTinTuc!);
    formData.append('maNguoiDung', this.user.maNguoiDung)

    this.tt.create(formData).subscribe(
      (res) => {
        this.toastr.success('Thêm thành công', '', {
          progressBar: true,
        });
        this.getall();
        // Đóng modal khi tạo thành công
        const addModal = this.addModal.nativeElement;
        addModal.classList.remove('show');
        addModal.style.display = 'none';
        document.body.classList.remove('modal-open');

        const modalBackdrop = document.getElementsByClassName('modal-backdrop');
        for (let i = 0; i < modalBackdrop.length; i++) {
          modalBackdrop[i].remove();
        }
      },
      (error) => {
        this.toastr.error('Đã xảy ra lỗi khi thêm .', '', {
          progressBar: true,
        });;
      }
    );
  }
  selectedRow: Tintuc | null = null;

  onRowClick(tintuc: Tintuc) {
    this.selectedRow = tintuc;
    this.MaTinTuc = this.selectedRow.maTinTuc;
    this.TieuDe = this.selectedRow.tieuDe;
    this.NoiDung = this.selectedRow.noiDung;
    this.NgayDang = this.formatDate(this.selectedRow.ngayDang);
    this.AnhTinTuc = this.selectedRow.anhTinTuc;
  }
  formatDate(date: string): string {
    const originalDate = new Date(date);
    originalDate.setDate(originalDate.getDate() + 1);
    const formattedDate = originalDate.toISOString().slice(0, 10);
    return formattedDate;
  }

  //Sửa
  update = () => {
    if (this.selectedRow) {
      // Tạo một đối tượng từ dữ liệu được chọn
      const formData = new FormData();
      formData.append('maTinTuc', String(this.MaTinTuc));
      formData.append('tieuDe', this.TieuDe);
      formData.append('noiDung', this.NoiDung);
      formData.append('file', this.AnhTinTuc!);
      formData.append('maNguoiDung', this.user.maNguoiDung)
      // Sử dụng Swal cho thông báo thành công
      this.tt.update(formData).subscribe(res => {
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
      });
    }
  }
  onDelete = () => {
    this.deleteModal.nativeElement.classList.add('show');
  }

  hanleDelete = () => {
    if (this.selectedRow) {
      // Thực hiện xóa dữ liệu
      this.tt.Delete(this.MaTinTuc).subscribe((res) => {
        this.toastr.success('xóa thành công', '', {
          progressBar: true,
        });
        this.getall();
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

  }
  //File
  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.AnhTinTuc = fileList[0];
    }
  }

}

