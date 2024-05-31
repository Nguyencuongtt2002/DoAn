import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Gioithieu } from 'src/app/models/gioithieu';
import { GioiThieuService } from 'src/app/services/gioithieu.service';

@Component({
  selector: 'app-gioi-thieu',
  templateUrl: './gioi-thieu.component.html',
  styleUrls: ['./gioi-thieu.component.css']
})
export class GioiThieuComponent implements OnInit {
  gioithieu: Array<Gioithieu> = [];
  constructor(private gt: GioiThieuService) { }

  ngOnInit(): void {
    this.getGioiThieuAll();
  }
  getGioiThieuAll = () => {
    this.gt.getGioiThieuAll().subscribe(res => {
      this.gioithieu = res;
    })
  }
}