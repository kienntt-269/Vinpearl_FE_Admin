import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-booking-setting',
  templateUrl: './booking-setting.component.html',
  styleUrls: ['./booking-setting.component.scss']
})
export class BookingSettingComponent implements OnInit {
  
  size: NzButtonSize = 'large';
  breadcrumb: any = [];
  listOfData: any = [];
  bookingId: any;
  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.bookingId = params.id;
    })
    this.breadcrumb = this.bookingId ? [
      {
        name: "Quản lý đặt phòng",
        route: "/pages/room-management"
      },
      {
        name: "Cập nhật",
        // route: "/pages/room-management/update-booking"
      },
    ] : [
      {
        name: "Quản lý đặt phòng",
        route: "/pages/room-management"
      },
      {
        name: "Thêm mới",
        // route: "/pages/room-management/add-booking"
      },
    ]

    this.listOfData = [
      {
        id: 1,
        name: "Nguyễn Kiên",
        age: 32,
        roomType: "Double",
        numberAdults: 5, 
        numberChildren: 0,
        createdAt: 1670484236420,
        startTime: 1670494336420,
        endTime: 1670584336420,
        email: "1@gmail.com",
        phone: "0862269856",
        address: "Bắc Ninh",
        status: 0,
      },
      {
        id: 2,
        name: "Nguyễn Kiên",
        age: 32,
        roomType: "Double",
        numberAdults: 5, 
        numberChildren: 0,
        createdAt: 1670484236420,
        startTime: 1670494336420,
        endTime: 1670584336420,
        email: "2@gmail.com",
        phone: "0862269856",
        address: "Bắc Ninh",
        status: 1,
      },
      {
        id: 3,
        name: "Nguyễn Kiên",
        age: 32,
        roomType: "Double",
        numberAdults: 5, 
        numberChildren: 0,
        createdAt: 1670484236420,
        startTime: 1670494336420,
        endTime: 1670584336420,
        email: "3@gmail.com",
        phone: "0862269856",
        address: "Bắc Ninh",
        status: 2,
      },
    ];
  }

  sortChange(e: any) {
    
  }

}
