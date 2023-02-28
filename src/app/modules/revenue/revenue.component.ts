import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/core/service/booking-management/booking.service';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.scss']
})
export class RevenueComponent implements OnInit {

  breadcrumb: any = [];
  listOfData: any = [];
  chartHotel: any;
  chartRoom: any;
  chartFlight: any;
  statusCards: any[] = [
    {
      count: 33,
      title: "Booking vé máy bay",
      path: "/admin/customers"
    },
    {
      count: 375,
      title: "Booking khách sạn",
      path: "/admin/customers"
    },
    {
      count: 150,
      title: "Tour điều hành",
      path: "/admin/customers"
    },
    {
      count: 202,
      title: "Báo giá",
      path: "/admin/customers"
    },
  ];

  constructor(
    private router: Router,
    private roomService: BookingService,
  ) { }

  ngOnInit(): void {
    this.breadcrumb = [
      {
        name: "Doanh thu",
        route: "/pages/revenue"
      }
    ];

    this.createChartHotel();
    this.createChartRoom();
    this.createChartFlight();
  }

  createChartHotel(){
    let months = ["January", "February", "March", "April", "June",  "July",  "August",  "September",  "October",  "November",  "December"];
    let currentMonth = new Date().getMonth();
    this.chartHotel = new Chart("MyChartHotel", {
      type: 'line', //this denotes tha type of chart

      data: {
        labels: months.slice(currentMonth - 6).concat(months.slice(0, currentMonth)),
        datasets: [
          {
            label: 'Khách hàng mới',
            data: [65, 100, 80, 181, 256, 55, 40],
            fill: false,
            borderColor: 'rgb(159,141,241)',
            tension: 0.1
          },
          {
            label: 'Khách hàng cũ',
            data: [65, 59, 80, 81, 56, 55, 40],
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
    const body = {

    }
    this.roomService.getListRoom(body).subscribe(res => {
      if (res.code == 200) {
        this.listOfData = res.data;
        console.log(res.data);
      }
    })
  }

  sortChange(e: any) {
    
  }

  updateBooking(data: any) {
    const params = {
      id: data.id,
    }
    this.router.navigate(['pages/room-management/update-type-of-room'], {queryParams: params});
  }

}
