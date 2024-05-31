import { OnInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LienheService } from 'src/app/services/lienhe.service';
import { Lienhe } from 'src/app/models/lienhe'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-ad-lien-he',
  templateUrl: './ad-lien-he.component.html',
  styleUrls: ['./ad-lien-he.component.css']
})
export class AdLienHeComponent implements OnInit {
  lienhe: Array<Lienhe> = new Array<Lienhe>();
  MaLienHe: number = 0
  Email: string = '';
  DiaChi: string = '';
  SoDienThoai: string = '';
  searchTerm: string = '';

  p: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  @ViewChild('addModal') addModal!: ElementRef;
  @ViewChild('updateModal') updateModal!: ElementRef;
  @ViewChild('deleteModal') deleteModal!: ElementRef;
  constructor(
    private lh: LienheService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getall(this.p);
  }
  taomoi() {
    this.Email = '';
    this.DiaChi = '';
    this.SoDienThoai = '';

    this.selectedRow = null
  }
  getall = (p: number) => {
    const obj = {
      page: p,
      pageSize: this.pageSize,
      email: this.searchTerm,
      soDienThoai: ""
    }
    this.lh.getlienheAll(obj).subscribe(res => {
      this.lienhe = res.data;
      this.totalItems = res.totalItems;
      this.p = p
    })
  }

  Them = () => {
    const lienhe: any = {
      email: this.Email,
      diaChi: this.DiaChi,
      soDienThoai: this.SoDienThoai,
    };

    this.lh.create(lienhe).subscribe(
      (res) => {
        if (res) {
          this.toastr.success('Thêm thành công', '', {
            progressBar: true,
          });
          this.getall(this.p);
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
  selectedRow: Lienhe | null = null;

  onRowClick(lienhe: Lienhe) {
    this.selectedRow = lienhe;
    this.MaLienHe = this.selectedRow.maLienHe,
      this.Email = this.selectedRow.email;
    this.DiaChi = this.selectedRow.diaChi;
    this.SoDienThoai = this.selectedRow.soDienThoai;
  }


  //Sửa
  update() {
    if (this.selectedRow) {
      // Tạo một đối tượng từ dữ liệu được chọn
      const lienhe: any = {
        MaLienHe: this.MaLienHe,
        Email: this.Email,
        DiaChi: this.DiaChi,
        SoDienThoai: this.SoDienThoai,
      };
      this.lh.update(lienhe).subscribe(res => {
        this.toastr.success('cập nhật thành công', '', {
          progressBar: true,
        });
        this.getall(this.p);
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

}
