import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DonhangService } from 'src/app/services/donhang.service';

@Component({
  selector: 'app-cam-on',
  templateUrl: './cam-on.component.html',
  styleUrls: ['./cam-on.component.css']
})
export class CamOnComponent {
  success: string = "Thanh toán không thành công";
  text: string = "Vui lòng kiểm tra lại";
  constructor(
    private dh: DonhangService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.router.navigate([], { queryParams: {} });
      console.log(params);
      this.callback(params);
    });
  }

  callback(params: any) {
    this.dh.callback(params).subscribe(res => {
      if (res.success) {
        this.success = "Thanh toán thành công cho đơn hàng " + res.orderId;
        this.text = "Cảm ơn bạn đã sử dụng dịch vụ";
      }
    })
  }
}
