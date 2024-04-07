import { OnInit, Component, ElementRef, ViewChild } from '@angular/core';
import { SanphamService } from 'src/app/services/sanpham.service';
import { Sanpham, ThongSoSanPham } from 'src/app/models/sanpham';
import { GiaService } from 'src/app/services/gia.service';
import { GiamGiaService } from 'src/app/services/giamgia.service';
import { Gia } from 'src/app/models/gia';
import { GiamGia } from 'src/app/models/giamgia';
import Swal from 'sweetalert2';
import { ThuongHieuService } from 'src/app/services/thuonghieu.service';
import { LoaisanphamService } from 'src/app/services/loaisanpham.service';
import { ThuongHieu } from 'src/app/models/thuonghieu';
import { Loaisanpham } from 'src/app/models/loaisanpham';
import { ThongSoService } from 'src/app/services/thongso.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { SizeService } from 'src/app/services/size.service';
import { Size } from 'src/app/models/size';
@Component({
  selector: 'app-ad-san-pham',
  templateUrl: './ad-san-pham.component.html',
  styleUrls: ['./ad-san-pham.component.css']
})
export class AdSanPhamComponent implements OnInit {
  gia: Gia = {
    maGia: 0,
    ngayBD: '',
    ngayKT: '',
    donGia: 0,
    maSanPham: 0
  };
  giamgia: GiamGia = {
    maGiamGia: 0,
    ngayBD: '',
    ngayKT: '',
    phanTram: 0,
    maSanPham: 0
  }

  listsanpham: Array<Sanpham> = new Array<Sanpham>();
  listsize: Array<Size> = new Array<Size>();
  thuonghieu: ThuongHieu[] = [];
  loaisanpham: Loaisanpham[] = [];
  newThongSo: { tenThongSo: string, moTa: string } = { tenThongSo: '', moTa: '' };
  thongSo: { tenThongSo: string, moTa: string }[] = [];
  //sản phẩm 
  MaSanPham: any;
  TenSP: string = '';
  MoTa: string = '';
  MaSize: any = '';
  TenLoaiSanPham: string = '';
  TenThuongHieu: string = '';
  MaLoaiSanPham: any = '';
  MaThuongHieu: any = '';
  AnhDaiDien: any = null
  donGia: number = 0;
  GiaMoiKhiGiam: number = 0;
  //giá 
  MaGia: any = null
  NgayBD: string = '';
  NgayKT: string = '';
  DonGia: any = '';


  //giamgia 
  NgayBatDau: string = '';
  NgayKetThuc: string = '';
  PhanTram: any = '';


  p: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  searchTerm: string = '';

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '125px',
    minHeight: '125px',
    placeholder: 'Nhập nội dung',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
  };
  @ViewChild('addModal') addModal!: ElementRef;
  @ViewChild('updateModal') updateModal!: ElementRef;
  constructor(
    private sp: SanphamService,
    private g: GiaService,
    private gg: GiamGiaService,
    private th: ThuongHieuService,
    private loaisp: LoaisanphamService,
    private ts: ThongSoService,
    private sz: SizeService,
  ) { }

  ngOnInit(): void {
    this.getSPALL(this.p);

    this.th.getThuongHieuAll().subscribe(res => {
      this.thuonghieu = res;

      this.loaisp.getLoaiSanPhamAll().subscribe(res => {
        this.loaisanpham = res;
      })
    })
    this.sz.getAll().subscribe(res => {
      this.listsize = res;
    })
  }
  taomoi() {
    this.TenSP = '';
    this.MoTa = '';
    this.MaSize = '';
    this.MaLoaiSanPham = '';
    this.MaThuongHieu = '';


    this.DonGia = '';
    this.NgayBD = '';
    this.NgayKT = '';

    this.NgayBatDau = ''
    this.NgayKetThuc = ''
    this.PhanTram = ''


    this.thongSo.splice(0, this.thongSo.length);
    this.selectedRow = null
  }
  getSPALL(p: number) {
    const obj = {
      page: this.p,
      pageSize: this.pageSize,
      tenSP: this.searchTerm
    }
    this.sp.getSPAll(obj).subscribe(res => {
      this.listsanpham = res.data;
      this.totalItems = res.totalItems;
      this.p = p
      console.log(this.totalItems)
    })
  }

  Them() {
    const formData = new FormData();
    formData.append('tenSP', this.TenSP);
    formData.append('moTa', this.MoTa);
    formData.append('maSize', String(this.MaSize))
    formData.append('maLoaiSanPham', String(this.MaLoaiSanPham));
    formData.append('maThuongHieu', String(this.MaThuongHieu))
    formData.append('file', this.AnhDaiDien!);
    Swal.fire({
      icon: 'success',
      title: 'Thành công!',
      text: 'sản phẩm đã được thêm thành công!',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        this.sp.create(formData).subscribe(
          (res) => {
            this.sp.getNewSanPham().subscribe(res => {
              const giasanpham: any = {
                ngayBD: this.NgayBD,
                ngayKT: this.NgayKT,
                donGia: this.DonGia,
                maSanPham: res.maSanPham,
              }
              this.g.create(giasanpham).subscribe(res => { });
              if (this.PhanTram && this.NgayBatDau !== undefined && this.NgayKetThuc !== undefined && this.NgayBatDau.trim() !== '' && this.NgayKetThuc.trim() !== '') {
                const giamgia: any = {
                  ngayBD: this.NgayBatDau,
                  ngayKT: this.NgayKetThuc,
                  phanTram: this.PhanTram,
                  maSanPham: res.maSanPham,
                };
                this.gg.create(giamgia).subscribe(res => { });
                for (let i = 0; i < this.thongSo.length; i++) {
                  const thongso: any = {
                    tenThongSo: this.thongSo[i].tenThongSo,
                    moTa: this.thongSo[i].moTa,
                    maSanPham: res.maSanPham,
                  }
                  this.ts.create(thongso).subscribe(res => { this.getSPALL(this.p); });
                }
              }

            });

            this.getSPALL(this.p);
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
              text: 'Đã xảy ra lỗi khi thêm sản phẩm.',
            });
          }
        );
      }
    });
  }

  //Thêm thông số 
  addThongSo() {
    if (this.newThongSo.tenThongSo && this.newThongSo.moTa) {
      this.thongSo.push({ ...this.newThongSo });
      this.newThongSo = { tenThongSo: '', moTa: '' };
    } else {
      alert('Thông tin thông số không được để trống');
    }
  }
  //Xoá thông số
  deleteThongSo(index: number): void {
    this.thongSo.splice(index, 1);
  }

  selectedRow: Sanpham | null = null;
  onRowClick(sanpham: Sanpham) {
    this.selectedRow = sanpham;
    this.MaSanPham = this.selectedRow.maSanPham;
    this.TenSP = this.selectedRow.tenSP;
    this.MoTa = this.selectedRow.moTa;
    this.MaSize = this.selectedRow.maSize;
    this.MaLoaiSanPham = this.selectedRow.maLoaiSanPham;
    this.MaThuongHieu = this.selectedRow.maThuongHieu;
    this.TenLoaiSanPham = this.selectedRow.tenLoaiSanPham;
    this.TenThuongHieu = this.selectedRow.tenThuongHieu;
    this.DonGia = this.selectedRow.donGia;
    this.GiaMoiKhiGiam = this.selectedRow.giaMoiKhiGiam;
    this.AnhDaiDien = this.selectedRow.anhDaiDien;
    this.PhanTram = this.selectedRow.phanTram;

    this.g.getgiaBySanPham(this.selectedRow.maSanPham).subscribe(res => {
      if (!res.data || res.data.length === 0) {
        this.gia.ngayBD = '';
        this.gia.ngayKT = '';
        this.gia.donGia = 0;
      } else {
        // Gán dữ liệu từ API cho biến 'gia'
        this.gia = res.data; // Đảm bảo 'res.data' có cùng cấu trúc với 'gia'
        // Kiểm tra và định dạng ngày thành định dạng mong muốn
        this.gia.ngayBD = this.formatDate(this.gia.ngayBD);
        this.gia.ngayKT = this.formatDate(this.gia.ngayKT);
      }
    });

    this.gg.getGiamGiaBySanPham(this.selectedRow.maSanPham).subscribe(
      (res: any) => {
        if (!res.data || res.data.length === 0) {
          this.giamgia.ngayBD = '';
          this.giamgia.ngayKT = '';
          this.giamgia.phanTram = 0;
        } else {
          // Gán dữ liệu từ API cho biến 'giamgia'
          this.giamgia = res.data; // Đảm bảo 'res.data' có cùng cấu trúc với 'giamgia'
          // Kiểm tra và định dạng ngày thành định dạng mong muốn
          this.giamgia.ngayBD = this.formatDate(this.giamgia.ngayBD);
          this.giamgia.ngayKT = this.formatDate(this.giamgia.ngayKT);
        }
      }
    );
    this.loadThongSo();
  }
  formatDate(date: string): string {
    const originalDate = new Date(date);
    originalDate.setDate(originalDate.getDate() + 1);
    const formattedDate = originalDate.toISOString().slice(0, 10);
    return formattedDate;
  }
  update() {
    if (this.selectedRow) {
      // Tạo một đối tượng từ dữ liệu được chọn
      const formData = new FormData();
      formData.append('maSanPham', String(this.MaSanPham));
      formData.append('tenSP', this.TenSP);
      formData.append('moTa', this.MoTa);
      formData.append('maSize', this.MaSize)
      formData.append('maLoaiSanPham', String(this.MaLoaiSanPham));
      formData.append('maThuongHieu', String(this.MaThuongHieu))
      formData.append('file', this.AnhDaiDien!);
      // Sử dụng Swal cho thông báo thành công
      Swal.fire({
        icon: 'success',
        title: 'Thành công!',
        text: 'Cập nhật sản phẩm thành công!',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          this.sp.update(formData).subscribe(res => {
            this.getSPALL(this.p);
            // Đóng modal khi tạo thành công
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
      });
    }
  }
  loadThongSo() {
    this.ts.getThongsoBySanPham(this.MaSanPham).subscribe(res => {
      this.thongSo = res.data;
    })
  }
  deleteThongSoUpdate(thongSo: any): void {
    console.log(thongSo)
    if (confirm('Bạn có muốn xóa thông số này không')) {
      this.ts.Delete(thongSo.maThongSo).subscribe(res => { this.loadThongSo(); });
    }
  }
  //Thêm thông số trong sửa sản phẩm
  createThongSoUpdate(): void {
    if (confirm('Bạn có muốn thêm thông số mới không?')) {
      const ThongSo: any = {
        tenThongSo: this.newThongSo.tenThongSo,
        moTa: this.newThongSo.moTa,
        maSanPham: this.MaSanPham,
      };
      this.ts.create(ThongSo).subscribe(res => {
        this.loadThongSo();
        this.newThongSo.moTa = '';
        this.newThongSo.tenThongSo = '';
      });
    }
  }

  CapNhatGia() {
    this.g.getgiaBySanPham(this.MaSanPham).subscribe(res => {
      if (!res.data || res.data.length === 0) {
        const gia: any = {
          ngayBD: this.gia.ngayBD,
          ngayKT: this.gia.ngayKT,
          donGia: this.gia.donGia,
          MaSanPham: this.selectedRow?.maSanPham,
        };
        this.g.create(gia).subscribe(res => {
          Swal.fire('Thành công', 'Thêm  giá thành công', 'success');
        });
      } else {
        const gia: any = {
          maGia: this.gia.maGia,
          ngayBD: this.gia.ngayBD,
          ngayKT: this.gia.ngayKT,
          donGia: this.gia.donGia,
          maSanPham: this.selectedRow?.maSanPham,
        };
        this.g.update(gia).subscribe(res => {
          Swal.fire('Thành công', 'Cập nhật  giá thành công', 'success');
        });
      }
    });
  }
  XoaGia() {
    Swal.fire({
      icon: 'question',
      title: 'Xác nhận',
      text: 'Bạn có chắc muốn xóa  giá của sản phẩm này không ?',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        // Nếu người dùng chọn Xóa, thực hiện hành động xóa
        this.g.Delete(this.gia.maGia).subscribe(res => {
          Swal.fire({
            icon: 'success',
            title: 'Thành công!',
            text: 'Xóa  giá thành công!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          }).then(() => {
            this.gia.ngayBD = '';
            this.gia.ngayKT = '';
            this.gia.donGia = 0;
            this.getSPALL(this.p);
          });
        });
      }
    });
  }
  CapNhatGiamGia() {
    this.gg.getGiamGiaBySanPham(this.MaSanPham).subscribe(res => {
      if (!res.data || res.data.length === 0) {
        const giamgia: any = {
          ngayBD: this.giamgia.ngayBD,
          ngayKT: this.giamgia.ngayKT,
          phanTram: this.giamgia.phanTram,
          maSanPham: this.selectedRow?.maSanPham,
        };
        this.gg.create(giamgia).subscribe(res => {
          Swal.fire('Thành công', 'Thêm giảm giá thành công', 'success');
        });
      } else {
        const giamgia: any = {
          maGiamGia: this.giamgia.maGiamGia,
          ngayBD: this.giamgia.ngayBD,
          ngayKT: this.giamgia.ngayKT,
          phanTram: this.giamgia.phanTram,
          maSanPham: this.selectedRow?.maSanPham,
        };
        this.gg.update(giamgia).subscribe(res => {
          Swal.fire('Thành công', 'Cập nhật giảm giá thành công', 'success');
        });
      }
    });
  }
  XoaGiamGia() {
    Swal.fire({
      icon: 'question',
      title: 'Xác nhận',
      text: 'Bạn có chắc muốn xóa giảm giá của sản phẩm này không ?',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        // Nếu người dùng chọn Xóa, thực hiện hành động xóa
        this.gg.Delete(this.giamgia.maGiamGia).subscribe(res => {
          Swal.fire({
            icon: 'success',
            title: 'Thành công!',
            text: 'Xóa giảm giá thành công!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          }).then(() => {
            this.giamgia.ngayBD = '';
            this.giamgia.ngayKT = '';
            this.giamgia.phanTram = 0;
            this.getSPALL(this.p);
          });
        });
      }
    });
  }
  //xóa 
  xoa() {
    // Sử dụng Swal để xác nhận việc xóa
    if (this.selectedRow) {
      Swal.fire({
        icon: 'question',
        title: 'Xác nhận',
        text: 'Bạn có chắc muốn xóa sản phẩm này ko  này không ?',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy'
      }).then((result) => {
        if (result.isConfirmed) {
          // Nếu người dùng chọn Xóa, thực hiện hành động xóa
          this.sp.Delete(this.MaSanPham).subscribe(res => {
            Swal.fire({
              icon: 'success',
              title: 'Thành công!',
              text: 'Xóa sản phẩm thành công!',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK',
            }).then(() => {
              // Cập nhật danh sách sau khi xóa
              this.getSPALL(this.p);
            });
          });
        }
      });
    }
  }

  //File
  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.AnhDaiDien = fileList[0];
    }
  }
}

