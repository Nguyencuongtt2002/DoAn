import { OnInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NguoidungService } from 'src/app/services/nguoidung.service';
import { Nguoidung } from 'src/app/models/nguoidung'
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import * as CryptoJS from 'crypto-js';
import { ThamSoService } from 'src/app/services/thamso.service';
@Component({
  selector: 'app-ad-nguoi-dung',
  templateUrl: './ad-nguoi-dung.component.html',
  styleUrls: ['./ad-nguoi-dung.component.css']
})
export class AdNguoiDungComponent implements OnInit {
  nguoidung: Nguoidung[] = [];

  MaNguoiDung: number = 0
  TaiKhoan: string = '';
  MatKhau: string = '';
  Email: string = '';
  HoTen: string = '';
  NgaySinh: string = '';
  GioiTinh: string = '';
  DiaChi: string = '';
  SoDienThoai: string = '';
  AnhDaiDien: any = null;
  VaiTro: string = '';
  MatKhauMoi: string = '';


  p: number = 1;
  pageSize: number = 3;
  totalItems: number = 0;
  searchTerm: string = '';

  @ViewChild('addModal') addModal!: ElementRef;
  @ViewChild('updateModal') updateModal!: ElementRef;
  @ViewChild('deleteModal') deleteModal!: ElementRef;
  @ViewChild('resetModal') resetModal!: ElementRef;
  constructor(
    private nd: NguoidungService,
    private toastr: ToastrService,
    private thamsoService: ThamSoService
  ) { }

  ngOnInit(): void {
    this.getall(1);
  }
  taomoi() {
    this.TaiKhoan = '';
    this.MatKhau = '123456789';
    this.Email = '';
    this.HoTen = '';
    this.GioiTinh = '';
    this.SoDienThoai = '0123456789';
    this.VaiTro = 'Khách hàng';

    this.selectedRow = null
  }
  getall(p: number) {
    const obj = {
      page: p,
      pageSize: this.pageSize,
    }
    this.nd.getAll(obj).subscribe(res => {
      this.nguoidung = res.data;
      this.totalItems = res.totalItems;
      this.p = p
    })
  }
  Them() {
    this.thamsoService.getByKyHieu("PassWord").subscribe(res => {
      const formData: any = new FormData();
      formData.append('taiKhoan', this.TaiKhoan);
      formData.append('matKhau', res.noiDung)
      formData.append('email', this.Email);
      formData.append('hoTen', this.HoTen);
      formData.append('ngaySinh', '2002-07-14');
      formData.append('gioiTinh', 'Nam');
      formData.append('diaChi', 'Thái Bình');
      formData.append('SoDienThoai', this.SoDienThoai);
      formData.append('anhDaiDien', 'avatar.jpg');
      formData.append('vaiTro', this.VaiTro);
      const confirmationLink = `${window.location.origin}/confirm`;
      formData.append('confirmationLink', confirmationLink);
      this.nd.createUser(formData).subscribe(
        (res) => {
          this.toastr.success('Thêm thành công', '', {
            progressBar: true,
          });
          this.getall(1);

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
          Swal.fire({
            icon: 'error',
            title: 'Lỗi!',
            text: 'Đã xảy ra lỗi khi thêm người dùng',
          });
        }
      );
    })

  }
  selectedRow: Nguoidung | null = null;

  onRowClick(nguoidung: Nguoidung) {
    this.selectedRow = nguoidung;
    this.MaNguoiDung = this.selectedRow.maNguoiDung;
    this.TaiKhoan = this.selectedRow.taiKhoan;
    this.MatKhau = this.selectedRow.matKhau;
    this.Email = this.selectedRow.email;
    this.HoTen = this.selectedRow.hoTen;
    this.NgaySinh = this.formatDate(this.selectedRow.ngaySinh);
    this.GioiTinh = this.selectedRow.gioiTinh;
    this.DiaChi = this.selectedRow.diaChi;
    this.SoDienThoai = this.selectedRow.soDienThoai;
    this.AnhDaiDien = this.selectedRow.anhDaiDien;
    this.VaiTro = this.selectedRow.vaiTro;
    this.MatKhauMoi = ''
  }
  formatDate(date: string): string {
    const originalDate = new Date(date);
    originalDate.setDate(originalDate.getDate() + 1);
    const formattedDate = originalDate.toISOString().slice(0, 10);
    return formattedDate;
  }

  //Sửa
  update() {
    if (this.selectedRow) {
      const formData = new FormData();
      formData.append('maNguoiDung', String(this.MaNguoiDung));
      formData.append('email', this.Email);
      formData.append('hoTen', this.HoTen);
      formData.append('ngaySinh', this.NgaySinh);
      formData.append('gioiTinh', this.GioiTinh);
      formData.append('diaChi', this.DiaChi);
      formData.append('soDienThoai', this.SoDienThoai);
      formData.append('vaiTro', this.VaiTro)

      const matkhaumoi = CryptoJS.MD5(this.MatKhauMoi).toString();
      if (matkhaumoi && this.MatKhau === matkhaumoi) {
        this.toastr.warning('Mật khẩu mới không được trùng mật khẩu cũ', '', {
          progressBar: true,
        });
        return;
      } else {
        formData.append('matKhau', this.MatKhauMoi);
      }
      if (this.AnhDaiDien && this.AnhDaiDien.size > 0) {
        formData.append('file', this.AnhDaiDien, this.AnhDaiDien.name);
      }
      this.nd.update(formData).subscribe(res => {
        this.toastr.success('cập nhật thành công', '', {
          progressBar: true,
        });
        this.getall(1);
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
  //xóa 
  // onDelete = () => {
  //   this.deleteModal.nativeElement.classList.add('show');
  // }

  // hanleDelete = () => {
  //   if (this.selectedRow) {
  //     if (this.selectedRow.vaiTro === 'Admin') {
  //       Swal.fire({
  //         icon: 'warning',
  //         title: 'Không thể xóa',
  //         text: 'Không thể xóa tài khoản có vai trò là Admin!',
  //         confirmButtonColor: '#3085d6',
  //         confirmButtonText: 'OK'
  //       });
  //       this.selectedRow = null;
  //       const deleteModal = this.deleteModal.nativeElement;
  //       deleteModal.classList.remove('show');
  //       deleteModal.style.display = 'none';
  //       document.body.classList.remove('modal-open');
  //       const modalBackdrop = document.getElementsByClassName('modal-backdrop');
  //       for (let i = 0; i < modalBackdrop.length; i++) {
  //         modalBackdrop[i].remove();
  //       }
  //     } else {
  //       // Thực hiện xóa dữ liệu
  //       this.nd.Delete(this.MaNguoiDung).subscribe((res) => {
  //         this.toastr.success('Xóa thành công', '', {
  //           progressBar: true,
  //         });
  //         this.getall(1);
  //         this.selectedRow = null;
  //         const deleteModal = this.deleteModal.nativeElement;
  //         deleteModal.classList.remove('show');
  //         deleteModal.style.display = 'none';
  //         document.body.classList.remove('modal-open');
  //         const modalBackdrop = document.getElementsByClassName('modal-backdrop');
  //         for (let i = 0; i < modalBackdrop.length; i++) {
  //           modalBackdrop[i].remove();
  //         }
  //       });
  //     }
  //   }
  // }

  onReset = () => {
    this.resetModal.nativeElement.classList.add('show');
  }
  hanleRest = () => {
    this.thamsoService.getByKyHieu("PassWord").subscribe(res => {
      const obj = {
        taiKhoan: this.TaiKhoan,
        matKhau: res.noiDung
      }
      if (this.selectedRow) {
        this.nd.ResetMatKhau(obj).subscribe((res) => {
          this.toastr.success('Reset mật khẩu thành công', '', {
            progressBar: true,
          });
          this.selectedRow = null
          const resetModal = this.resetModal.nativeElement;
          resetModal.classList.remove('show');
          resetModal.style.display = 'none';
          document.body.classList.remove('modal-open');
          const modalBackdrop = document.getElementsByClassName('modal-backdrop');
          for (let i = 0; i < modalBackdrop.length; i++) {
            modalBackdrop[i].remove();
          }
        })
      }
    })
  }
  //File
  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.AnhDaiDien = fileList[0];
    }
  }

}
