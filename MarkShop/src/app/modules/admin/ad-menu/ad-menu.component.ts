import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { Menu } from 'src/app/models/menu';
import { ToastrService } from 'ngx-toastr';
import { LoadScriptService } from 'src/app/services/loadscript.service';
@Component({
  selector: 'app-ad-menu',
  templateUrl: './ad-menu.component.html',
  styleUrls: ['./ad-menu.component.css']
})
export class AdMenuComponent implements OnInit {
  menu: Array<Menu> = new Array<Menu>();
  MaMenu: number = 0;
  TenMenu: string = "";
  Link: string = "";
  btnText: string = "Thêm";
  @ViewChild('CreateUpdateModal') CreateUpdateModal!: ElementRef;
  @ViewChild('deleteModal') deleteModal!: ElementRef;
  constructor(
    private mn: MenuService,
    private toastr: ToastrService,
    private load2: LoadScriptService) { }

  ngOnInit(): void {
    this.getAll();
    this.loadJS();
  }
  getAll = () => {
    const obj: any = {
      page: 1,
      pageSize: 10
    }
    this.mn.getAll(obj).subscribe(res => {
      this.menu = res.data;
    })
  }
  taomoi = () => {
    this.TenMenu = "";
    this.Link = "";
    this.btnText = "Thêm";
  }
  CreateUpdate = () => {
    const obj = {
      MaMenu: this.MaMenu,
      TenMenu: this.TenMenu,
      Link: this.Link
    };

    if (this.btnText === "Thêm") {
      this.mn.create(obj).subscribe(res => {
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
      this.mn.update(obj).subscribe(res => {
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
  CapNhat = (item: any) => {
    console.log(item.gioiThieu)
    this.btnText = 'Cập nhật';
    this.MaMenu = item.maMenu;
    this.TenMenu = item.tenMenu;
    this.Link = item.link
  }
  onDelete = (item: any) => {
    this.MaMenu = item.maMenu;
    this.deleteModal.nativeElement.classList.add('show');
  }

  hanleDelete = () => {
    // Thực hiện xóa dữ liệu
    this.mn.Delete(this.MaMenu).subscribe((res) => {
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
  private async loadJS(): Promise<void> {
    await this.load2.loadScript('/assets/JS/jquery-3.5.1.min.js')
    await this.load2.loadScript('/assets/JS/jquery.countup.min.js')
    await this.load2.loadScript('/assets/JS/jquery.validate.min.js')
    await this.load2.loadScript('/assets/JS/jquery.validate.unobtrusive.min.js')
    await this.load2.loadScript('/assets/JS/index.js')
  }
}



