import { Component } from '@angular/core';
import { ThamSo } from 'src/app/models/thamso';
import { ThamSoService } from 'src/app/services/thamso.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  logo: ThamSo = new ThamSo();
  email: ThamSo = new ThamSo();
  diaChi: ThamSo = new ThamSo();
  sdt: ThamSo = new ThamSo();

  constructor(private thamsoService: ThamSoService) { }

  ngOnInit() {
    this.loadThamSo();
  }

  //Tham số
  loadThamSo() {
    this.thamsoService.getByKyHieu("LOGO").subscribe(res => {
      this.logo = res
    });
    this.thamsoService.getByKyHieu("EMAIL").subscribe(res => {
      this.email = res;
    });
    this.thamsoService.getByKyHieu("ADRESS").subscribe(res => {
      this.diaChi = res;
    });
    this.thamsoService.getByKyHieu("NUMBER").subscribe(res => {
      this.sdt = res;
    });
  }
}
