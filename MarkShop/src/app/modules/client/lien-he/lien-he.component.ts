import { Component, OnInit } from '@angular/core';
import { LienheService } from 'src/app/services/lienhe.service';
import { Lienhe } from 'src/app/models/lienhe'

@Component({
  selector: 'app-lien-he',
  templateUrl: './lien-he.component.html',
  styleUrls: ['./lien-he.component.css']
})
export class LienHeComponent implements OnInit {
  lienhe: Array<Lienhe> = new Array<Lienhe>();
  constructor(private lh: LienheService) { }

  ngOnInit(): void {
    this.getLienHeAll()

  }
  getLienHeAll = () => {
    const obj = {
      page: 1,
      pageSize: 10,
      email: "",
      soDienThoai: ""
    }
    this.lh.getlienheAll(obj).subscribe(res => {
      this.lienhe = res.data;
    })
  }
}
