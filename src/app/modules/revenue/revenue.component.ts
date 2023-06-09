import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/core/service/booking-management/booking.service';
import { RoomService } from 'src/app/core/service/room-management/room.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.scss']
})
export class RevenueComponent implements OnInit {

  breadcrumb: any = [];
  listOfDataTotal: any = [];
  listOfStatistics: any = [];
  listOfDataTour: any = [];
  listOfDataCustomer: any = [];
  chartHotel: any;
  chartRoom: any;
  chartFlight: any;

  pageSize: any = 5;
  pageIndex: any = 0;
  sort: any = "id,desc";

  constructor(
    private router: Router,
    private roomService: RoomService,
    private bookingService: BookingService,
  ) { }

  ngOnInit(): void {
    this.breadcrumb = [
      {
        name: localStorage.getItem('lang') == "vi" ? "Doanh thu" : "Revenue",
        route: "/pages/revenue"
      }
    ];

    const data = {
      page: this.pageIndex,
      size: this.pageSize,
      sort: this.sort,
    }

    this.bookingService.getListTotal().subscribe(res => {
      if (res.code == 200) {
        this.listOfDataTotal = res.data;
      }
    })

    this.bookingService.getListStatistics().subscribe(res => {
      if (res.code == 200) {
        this.listOfStatistics = res.data;
        this.createChartHotel(this.listOfStatistics);
      }
    })

    this.bookingService.getListBookingTour(data).subscribe(res => {
      if (res.code == 200) {
        this.listOfDataTour = res.data.content;
      }
    })

    this.bookingService.getTop5Customer().subscribe(res => {
      console.log(res);
      if (res.code == 200) {
        this.listOfDataCustomer = res.data;
      }
    }, (error: HttpErrorResponse) => {
      console.log(error.error);
      console.log(error.status);
      console.log(error.statusText);
    }
    )
    this.createChartRoom();
    this.createChartFlight();
  }

  createChartHotel(listOfStatistics: any){
    console.log(listOfStatistics.map((item: any) => item.data))
    let months = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5",  "Tháng 6",  "Tháng 7",  "Tháng 8",  "Tháng 9",  "Tháng 10",  "Tháng 11", "Tháng 12"];
    // let currentMonth = new Date().getMonth();
    this.chartHotel = new Chart("MyChartHotel", {
      type: 'line', //this denotes tha type of chart

      data: {
        // labels: months.slice(currentMonth - 6).concat(months.slice(0, currentMonth)),
        labels: months,
        datasets: [
          {
            label: 'Khách hàng đặt tour',
            data:  listOfStatistics.length > 0 ? listOfStatistics.map((item: any) => item.dataTour) : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            fill: false,
            borderColor: 'rgb(159,141,241)',
            tension: 0.1
          },
          {
            label: 'Khách hàng đặt phòng',
            data: listOfStatistics.length > 0 ? listOfStatistics.map((item: any) => item.dataRoom) : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            fill: false,
            borderColor: 'rgb(231,154,59)',
            tension: 0.1
          },
        ]
      },
      options: {
        aspectRatio:2.5
      }
      });
  }

  createChartRoom(){

    this.chartRoom = new Chart("MyChartRoom", {
      type: 'doughnut', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: [
          'Hủy',
          'Thành công',
          'Đang xử lý'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          // hoverOffset: 4
        }]
      },
      options: {
        aspectRatio:2.5
      }

    });
  }

  createChartFlight(){

    this.chartFlight = new Chart("MyChartFlight", {
      type: 'doughnut', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: [
          'Hủy',
          'Thành công',
          'Đang xử lý'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          // hoverOffset: 4
        }]
      },
      options: {
        aspectRatio:2.5
      }

    });
  }

  getRoom() {

  }

  sortChange(e: any) {

  }

}
