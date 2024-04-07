import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DonhangService } from 'src/app/services/donhang.service';

@Component({
  selector: 'app-cam-on',
  templateUrl: './cam-on.component.html',
  styleUrls: ['./cam-on.component.css']
})
export class CamOnComponent {
  success: string = "Thanh toán không thành công";
  text: string = "Vui lòng kiểm tra lại";
  private routeSubscription: Subscription;

  constructor(
    private donhangService: DonhangService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.routeSubscription = this.route.queryParams.subscribe(params => {
      if (params && Object.keys(params).length > 0) {
        this.router.navigate([], { queryParams: {} });
        this.callback(params);
      }
    });
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  callback(params: any) {
    this.donhangService.callback(params).subscribe(res => {
      if (res.success) {
        this.success = "Thanh toán thành công cho đơn hàng " + res.orderId;
        this.text = "Cảm ơn bạn đã sử dụng dịch vụ";
      }
    });
  }

}
