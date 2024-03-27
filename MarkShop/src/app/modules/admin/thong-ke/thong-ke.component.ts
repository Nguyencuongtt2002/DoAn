import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import {
  ThongKeDoanhThuTheoNam, ThongKeDoanhThuTheoThang, ThongKeNguoiDungMuaHang,
  ThongKeSanPhamBanChay
} from 'src/app/models/thongke';
import { ThongKeService } from 'src/app/services/thongke.service';

@Component({
  selector: 'app-thong-ke',
  templateUrl: './thong-ke.component.html',
  styleUrls: ['./thong-ke.component.css']
})
export class ThongKeComponent implements OnInit {
  thongkedoanhthutheothang: ThongKeDoanhThuTheoThang[] = [];
  chart1: any;
  thongkesanphambanchay: ThongKeSanPhamBanChay[] = [];
  chart2: any;
  thongkedoanhthutheonam: ThongKeDoanhThuTheoNam[] = [];
  chart3: any;
  thongkenguoidungmuahang: ThongKeNguoiDungMuaHang[] = [];
  chart4: any;
  thongketongsoluong: any;
  tongSanPham: number = 0;
  tongNguoiDung: number = 0;
  tongDoanhThu: number = 0;
  constructor(private service: ThongKeService) { }
  ngOnInit(): void {
    this.LoadDoanhThuTheoThang();
    this.LoadSanPhamBanChay();
    this.LoadThongKeNguoiDungMuaHang();
    this.LoadThongKeDoanhThuTheoNam();
    this.LoadThongKeSoLuong();
  }
  formatDate(date: string): string {
    const originalDate = new Date(date);
    const month = originalDate.getMonth() + 1;
    const year = originalDate.getFullYear();
    const formattedDate = `${month.toString().padStart(2, '0')}/${year}`;
    return formattedDate;
  }

  LoadThongKeSoLuong = () => {
    this.service.thongKeTongSoLuong().subscribe(res => {
      console.log(res)
      this.thongketongsoluong = res;
      this.tongSanPham = this.thongketongsoluong?.tongSanPham ?? 0;
      this.tongNguoiDung = this.thongketongsoluong?.tongNguoiDung ?? 0;
      this.tongDoanhThu = this.thongketongsoluong?.tongDoanhThu ?? 0;
    })
  }
  LoadDoanhThuTheoThang = () => {
    this.service.thongKeDoanhThuTheoThang().subscribe(res => {
      this.thongkedoanhthutheothang = res;
      const thoiGian = this.thongkedoanhthutheothang.map(item => this.formatDate(item.thoiGian));
      const doanhThu = this.thongkedoanhthutheothang.map(item => item.doanhThuTheoThang);

      const data = {
        labels: thoiGian,
        datasets: [{
          label: 'Doanh thu theo tháng',
          data: doanhThu,
          fill: false,
          borderColor: 'rgb(122, 146, 163)',
          tension: 0.1
        }]
      };

      this.chart1 = new Chart("chart1", {
        type: 'line',
        data: data
      });
    });
  }


  LoadSanPhamBanChay = () => {
    this.service.thongKeSanPhamBanChay().subscribe(res => {
      this.thongkesanphambanchay = res;

      const soluong = this.thongkesanphambanchay.map(item => item.soLuongBan);
      const ten = this.thongkesanphambanchay.map(item => item.tenSanPham);

      const data = {
        datasets: [{
          data: soluong,
          label: 'số lượng',
          backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#8a2be2', '#00ced1'],
        }],
        labels: ten,
      };

      const options: any = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
          }
        }
      };

      this.chart2 = new Chart("chart2", {
        type: 'pie',
        data: data,
        options: options
      });
    });
  }


  LoadThongKeDoanhThuTheoNam = () => {
    this.service.thongKeDoanhThuTheoNam().subscribe(res => {
      this.thongkedoanhthutheonam = res;
      const nam = this.thongkedoanhthutheonam.map(item => item.nam);
      const doanhthutheonam = this.thongkedoanhthutheonam.map(item => item.doanhThuTheoNam);
      const data = {
        labels: nam,
        datasets: [{
          label: 'Doanh thu theo năm',
          data: doanhthutheonam,
          fill: false,
          tension: 0.1,
          backgroundColor: '#6677ef'
        }]
      };

      this.chart3 = new Chart("chart3", {
        type: 'bar',
        data: data
      })
    })
  }



  LoadThongKeNguoiDungMuaHang = () => {
    const fixedBackgroundColors = [
      'rgba(255, 99, 132, 0.8)',
      'rgba(54, 162, 235, 0.8)',
      'rgba(255, 206, 86, 0.8)',
      'rgba(75, 192, 192, 0.8)',
      'rgba(153, 102, 255, 0.8)'
    ];

    const fixedBorderColors = [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)'
    ];
    this.service.thongKeNguoiDungMuaHang().subscribe(res => {
      this.thongkenguoidungmuahang = res;

      const doanhThu = this.thongkenguoidungmuahang.map(item => item.doanhThu);
      const nam = this.thongkenguoidungmuahang.map(item => item.nam);
      const hoten = this.thongkenguoidungmuahang.map(item => item.hoTen);

      const uniqueNam = [...new Set(nam)];
      const uniqueHoten = [...new Set(hoten)];

      const datasets = uniqueHoten.map((ten, index) => {
        const filteredData = uniqueNam.map((year) => {
          const dataForYear = doanhThu.filter((_, i) => hoten[i] === ten && nam[i] === year);
          return dataForYear.length > 0 ? dataForYear[0] : 0;
        });
        const backgroundColor = fixedBackgroundColors[index % fixedBackgroundColors.length];
        const borderColor = fixedBorderColors[index % fixedBorderColors.length];
        return {
          label: ten,
          data: filteredData,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: 1
        };
      });

      const data = {
        labels: uniqueNam.map(String),
        datasets: datasets
      };

      this.chart4 = new Chart("chart4", {
        type: 'bar',
        data: data,
        options: {
          scales: {
            x: {
              stacked: true // Xếp cột cho từng năm
            },
            y: {
              stacked: true // Xếp cột cho từng năm
            }
          },
          plugins: {
            legend: {
              position: 'bottom',
            }
          }
        }
      });
    })
  }
}
