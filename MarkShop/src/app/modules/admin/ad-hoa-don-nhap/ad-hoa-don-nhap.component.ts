import { OnInit, Component, ElementRef, ViewChild } from '@angular/core';
import { HoaDonNhap } from 'src/app/models/hoadonnhap';
import { NhaCungCap } from 'src/app/models/nhacungcap';
import { HoaDonNhapService } from 'src/app/services/hoadonnhap.service';
import { NguoidungService } from 'src/app/services/nguoidung.service';
import { NhaCungCapService } from 'src/app/services/nhacungcap.service';
import { ToastrService } from 'ngx-toastr';
import { ChiTietHoaDonNhapService } from 'src/app/services/chitiethoadonnhap.service';
import { Sanpham } from 'src/app/models/sanpham';
import { SanphamService } from 'src/app/services/sanpham.service';
import { LienheService } from 'src/app/services/lienhe.service';
@Component({
  selector: 'app-ad-hoa-don-nhap',
  templateUrl: './ad-hoa-don-nhap.component.html',
  styleUrls: ['./ad-hoa-don-nhap.component.css']
})
export class AdHoaDonNhapComponent implements OnInit {

  lienhe: any;
  listsanpham: Sanpham[] = []
  nhacungcap: Array<NhaCungCap> = new Array<NhaCungCap>();
  listhoadonnhap: Array<HoaDonNhap> = new Array<HoaDonNhap>();
  HoTen: string = '';
  MaNguoiDung: number = 0;
  MaNhaCungCap: any = '';
  user: any;
  newcthoadonnhap: { maSanPham: any, soLuong: number, giaTien: number, tenSP?: string } = {
    maSanPham: '',
    soLuong: 0,
    giaTien: 0,
    tenSP: ''
  };
  listchitiethoadonnhap: any
  chitiethoadonnhap: { maSanPham: any, soLuong: number, giaTien: number, tenSP?: string }[] = [];

  MaHDN: any;


  TenSP: string = '';
  TenNguoiNhap: string = '';
  TenNhaCungCap: string = '';
  TongSoLuong: number = 0;
  TongTien: number = 0
  @ViewChild('addModal') addModal!: ElementRef;
  @ViewChild('updateModal') updateModal!: ElementRef;
  @ViewChild('deleteModal') deleteModal!: ElementRef;
  constructor(
    private hdn: HoaDonNhapService,
    private ncc: NhaCungCapService,
    private nd: NguoidungService,
    private toastr: ToastrService,
    private ct: ChiTietHoaDonNhapService,
    private sp: SanphamService,
    private lh: LienheService
  ) { }
  ngOnInit(): void {
    this.getallncc();
    this.getallhdn();
    this.getLienHeAll();
    this.user = this.nd.checkLogin();
  }
  taomoi = () => {
    this.MaNhaCungCap = '';
    this.chitiethoadonnhap.splice(0, this.chitiethoadonnhap.length);
    this.getSPALL();
  }
  getLienHeAll = () => {
    const obj = {
      page: 1,
      pageSize: 2,
      email: "",
      soDienThoai: ""
    }
    this.lh.getlienheAll(obj).subscribe(res => {
      this.lienhe = res.data;
    })
  }
  getallhdn = () => {
    const obj = {
      page: 1,
      pageSize: 20
    }
    this.hdn.getAll(obj).subscribe(res => {
      this.listhoadonnhap = res.data;
    })
  }
  getallncc = () => {
    this.ncc.getAll().subscribe(res => {
      this.nhacungcap = res;
    })
  }
  Them = () => {
    const obj: any = {
      maNhaCungCap: this.MaNhaCungCap,
      maNguoiDung: this.user.maNguoiDung
    };
    this.hdn.create(obj).subscribe(
      (res) => {
        this.toastr.success('Thêm thành công', '', {
          progressBar: true,
        });
        this.hdn.getNewHoaDonNhap().subscribe(res => {
          for (let i = 0; i < this.chitiethoadonnhap.length; i++) {
            const obj: any = {
              maHDN: res.maHDN,
              maSanPham: this.chitiethoadonnhap[i].maSanPham,
              soLuong: this.chitiethoadonnhap[i].soLuong,
              giaTien: this.chitiethoadonnhap[i].giaTien,
            }
            this.ct.create(obj).subscribe(res => { this.getallhdn(); });
            console.log((this.chitiethoadonnhap[i].maSanPham))
            this.tangSoLuong(this.chitiethoadonnhap[i].maSanPham, this.chitiethoadonnhap[i].soLuong)
          }
        })
        this.getallhdn();
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

  tangSoLuong(maSanPham: number, soluong: number) {
    this.sp.getOne(maSanPham).subscribe(res => {
      const formData = new FormData();
      formData.append('maSanPham', maSanPham.toString());
      formData.append('soLuong', (Number(res.soLuong) + Number(soluong)).toString());
      this.sp.update(formData).subscribe(res => { })
    })
  }
  giamSoLuong(maSanPham: number, soluong: number) {
    this.sp.getOne(maSanPham).subscribe(res => {
      const formData = new FormData();
      formData.append('maSanPham', maSanPham.toString());
      formData.append('soLuong', (Number(res.soLuong) - Number(soluong)).toString());

      this.sp.update(formData).subscribe(res => { })
    })
  }

  //Thêm chi tiết hóa đơn nhập 
  addCT() {
    if (this.newcthoadonnhap.maSanPham && this.newcthoadonnhap.soLuong && this.newcthoadonnhap.giaTien) {
      const selectedProduct = this.listsanpham.find(product => product.maSanPham === parseInt(this.newcthoadonnhap.maSanPham, 10));
      console.log(parseInt(this.newcthoadonnhap.maSanPham, 10), this.newcthoadonnhap.maSanPham)
      if (selectedProduct) {
        this.chitiethoadonnhap.push({
          maSanPham: selectedProduct.maSanPham,
          tenSP: selectedProduct.tenSP,
          soLuong: this.newcthoadonnhap.soLuong,
          giaTien: this.newcthoadonnhap.giaTien
        });
        this.newcthoadonnhap = { maSanPham: '', soLuong: 0, giaTien: 0, tenSP: '' };
      } else {
        alert('Không tìm thấy sản phẩm');
      }
    } else {
      alert('Thông tin không được để trống');
    }
  }
  deleteCT(index: number): void {
    this.chitiethoadonnhap.splice(index, 1);
  }
  getSPALL() {
    const obj = {
      page: 1,
      pageSize: 100,
      tenSP: ''
    }
    this.sp.getSPAll(obj).subscribe(res => {
      this.listsanpham = res.data;
    })
  }

  selectedRow: HoaDonNhap | null = null;

  onRowClick = (hoadonnhap: HoaDonNhap) => {
    this.selectedRow = hoadonnhap;
    this.MaHDN = this.selectedRow.maHDN;
    this.MaNhaCungCap = this.selectedRow.maNhaCungCap;
    this.HoTen = this.selectedRow.hoTen;
    this.loadCTHoaDonNhap()
    this.getSPALL()
    this.getHdnId();
    this.getChiTietHDN(this.MaHDN);
  }

  getHdnId = () => {
    this.hdn.getOne(this.MaHDN).subscribe(res => {
      this.TongSoLuong = res.tongSoLuong;
      this.TongTien = res.tongTien;
      this.TenNguoiNhap = res.hoTen;
      this.TenNhaCungCap = res.tenNhaCungCap;
    })
  }
  getChiTietHDN(id: number) {
    this.ct.getcthoadonnhapByhoadonnhap(id).subscribe(res => {
      console.log(res)
      this.listchitiethoadonnhap = res.data;
    });
  }
  loadCTHoaDonNhap() {
    this.ct.getcthoadonnhapByhoadonnhap(this.MaHDN).subscribe(res => {
      console.log(res.data)
      this.chitiethoadonnhap = res.data;
    })
  }

  deleteCThoadonUpdate(chitiet: any): void {
    console.log(chitiet)
    if (confirm('Bạn có muốn xóa chi tiết này không')) {
      this.ct.Delete(chitiet.maChiTiet).subscribe(res => { this.loadCTHoaDonNhap(); });
    }
    this.giamSoLuong(chitiet.maSanPham, chitiet.soLuong)
  }
  createCThoadonUpdate(): void {
    if (confirm('Bạn có muốn thêm chi tiết mới không?')) {
      const obj: any = {
        maHDN: this.MaHDN,
        maSanPham: this.newcthoadonnhap.maSanPham,
        soLuong: this.newcthoadonnhap.soLuong,
        giaTien: this.newcthoadonnhap.giaTien,
      };
      this.ct.create(obj).subscribe(res => {
        this.loadCTHoaDonNhap();
        this.newcthoadonnhap.maSanPham = '';
        this.newcthoadonnhap.soLuong = 0;
        this.newcthoadonnhap.giaTien = 0
      });
      this.tangSoLuong(obj.maSanPham, obj.soLuong);
    }
  }

  update() {
    if (this.selectedRow) {
      const obj: any = {
        maHDN: this.MaHDN,
        maNhaCungCap: this.MaNhaCungCap,
        maNguoiDung: this.user.maNguoiDung
      };
      this.hdn.update(obj).subscribe(res => {
        this.toastr.success('cập nhật thành công', '', {
          progressBar: true,
        });
        this.getallhdn();
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
  }
  onDelete = () => {
    this.deleteModal.nativeElement.classList.add('show');
  }

  hanleDelete = () => {
    if (this.selectedRow) {
      // Thực hiện xóa dữ liệu
      this.hdn.Delete(this.MaHDN).subscribe((res) => {
        this.toastr.success('xóa thành công', '', {
          progressBar: true,
        });
        this.getallhdn();
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
  exportToExcel() {
    const id = Number(this.selectedRow?.maHDN);
    this.ct.excel(id).subscribe((data: Blob) => {
      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = `hoadon${id}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, error => {
      console.error('Đã xảy ra lỗi khi xuất Excel:', error);
      // Xử lý lỗi
    });
  }
}
