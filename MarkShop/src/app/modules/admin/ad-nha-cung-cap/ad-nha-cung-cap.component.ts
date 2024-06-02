import { OnInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NhaCungCapService } from 'src/app/services/nhacungcap.service';
import { NhaCungCap } from 'src/app/models/nhacungcap'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-ad-nha-cung-cap',
  templateUrl: './ad-nha-cung-cap.component.html',
  styleUrls: ['./ad-nha-cung-cap.component.css']
})
export class AdNhaCungCapComponent implements OnInit {
  nhacungcap: Array<NhaCungCap> = new Array<NhaCungCap>();

  MaNhaCungCap: number = 0;
  TenNhaCungCap: string = ''
  Email: string = '';
  DiaChi: string = '';
  SoDienThoai: string = '';

  searchTerm: string = '';

  @ViewChild('addModal') addModal!: ElementRef;
  @ViewChild('updateModal') updateModal!: ElementRef;
  @ViewChild('deleteModal') deleteModal!: ElementRef;
  constructor(private ncc: NhaCungCapService, private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.getall();
  }
  taomoi = () => {
    this.TenNhaCungCap = '';
    this.Email = '';
    this.DiaChi = '';
    this.SoDienThoai = '';

    this.selectedRow = null
  }
  getall = () => {
    this.ncc.getAll().subscribe(res => {
      this.nhacungcap = res;
    })
  }
  Them = () => {
    const lienhe: any = {
      TenNhaCungCap: this.TenNhaCungCap,
      DiaChi: this.DiaChi,
      SoDienThoai: this.SoDienThoai,
      Email: this.Email,
    };
    this.ncc.create(lienhe).subscribe(
      (res) => {
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
      },
      (error) => {
        this.toastr.error('Đã xảy ra lỗi khi thêm nhà cung cấp.', '', {
          progressBar: true,
        });;

      }
    );
  }
  selectedRow: NhaCungCap | null = null;

  onRowClick = (nhacungcap: NhaCungCap) => {
    this.selectedRow = nhacungcap;
    this.MaNhaCungCap = this.selectedRow.maNhaCungCap,
      this.TenNhaCungCap = this.selectedRow.tenNhaCungCap,
      this.DiaChi = this.selectedRow.diaChi;
    this.SoDienThoai = this.selectedRow.soDienThoai;
    this.Email = this.selectedRow.email;
  }


  //Sửa
  update = () => {
    if (this.selectedRow) {
      // Tạo một đối tượng từ dữ liệu được chọn
      const lienhe: any = {
        maNhaCungCap: this.MaNhaCungCap,
        tenNhaCungCap: this.TenNhaCungCap,
        diaChi: this.DiaChi,
        soDienThoai: this.SoDienThoai,
        email: this.Email,
      };
      // Sử dụng Swal cho thông báo thành công
      this.ncc.update(lienhe).subscribe(res => {
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
  //xóa 
  onDelete = (item: any) => {
    this.MaNhaCungCap = item.maNhaCungCap;
    this.deleteModal.nativeElement.classList.add('show');
  }

  hanleDelete = () => {
    // Thực hiện xóa dữ liệu
    this.ncc.Delete(this.MaNhaCungCap).subscribe((res) => {
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
  //tìm kiếm 

}
