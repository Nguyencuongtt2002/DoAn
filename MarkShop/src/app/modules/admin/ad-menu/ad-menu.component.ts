import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { Menu } from 'src/app/models/menu';
import { ToastrService } from 'ngx-toastr';
import { LoadScriptService } from 'src/app/services/loadscript.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-ad-menu',
  templateUrl: './ad-menu.component.html',
  styleUrls: ['./ad-menu.component.css']
})
export class AdMenuComponent implements OnInit {
  menu: Menu[] = [];
  MaMenu: number = 0;
  TenMenu: string = "";
  Link: string = "";
  btnText: string = "Thêm";
  p: number = 1;
  pageSize: number = 3;
  totalItems: number = 0;
  searchTerm: string = '';
  @ViewChild('CreateUpdateModal') CreateUpdateModal!: ElementRef;
  @ViewChild('deleteModal') deleteModal!: ElementRef;

  constructor(
    private mn: MenuService,
    private toastr: ToastrService,
    private load2: LoadScriptService
  ) { }

  ngOnInit(): void {
    this.getAll(1);
    this.loadJS();
  }

  getAll(page: number): void {
    this.mn.getAllAdmin(page, this.pageSize, this.searchTerm).subscribe(res => {
      this.menu = res.data;
      this.p = page;
      this.totalItems = res.totalItems;
    });
  }

  taomoi(): void {
    this.TenMenu = "";
    this.Link = "";
    this.btnText = "Thêm";
  }

  CreateUpdate(): void {
    const obj = {
      MaMenu: this.MaMenu,
      TenMenu: this.TenMenu,
      Link: this.Link
    };

    const successMessage = this.btnText === "Thêm" ? 'Thêm thành công' : 'Cập nhật thành công';

    (this.btnText === "Thêm" ? this.mn.create(obj) : this.mn.update(obj)).subscribe(res => {
      if (res) {
        this.toastr.success(successMessage, '', { progressBar: true });
        this.getAll(1);
        this.closeModal(this.CreateUpdateModal.nativeElement);
      }
    });
  }

  CapNhat(item: any): void {
    this.btnText = 'Cập nhật';
    this.MaMenu = item.maMenu;
    this.TenMenu = item.tenMenu;
    this.Link = item.link;
  }

  onDelete(item: any): void {
    this.MaMenu = item.maMenu;
    this.deleteModal.nativeElement.classList.add('show');
  }

  hanleDelete(): void {
    this.mn.Delete(this.MaMenu).subscribe(() => {
      this.toastr.success('Xóa thành công', '', { progressBar: true });
      this.getAll(1);
      this.closeModal(this.deleteModal.nativeElement);
    });
  }

  private loadJS(): void {
    const scripts = [
      '/assets/JS/jquery-3.5.1.min.js',
      '/assets/JS/jquery.countup.min.js',
      '/assets/JS/jquery.validate.min.js',
      '/assets/JS/jquery.validate.unobtrusive.min.js',
      '/assets/JS/index.js'
    ];

    scripts.forEach(script => this.load2.loadScript(script));
  }

  closeModal(modal: any): void {
    modal.classList.remove('show');
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
    const modalBackdrop = document.getElementsByClassName('modal-backdrop');
    for (let i = 0; i < modalBackdrop.length; i++) {
      modalBackdrop[i].remove();
    }
  }
}
