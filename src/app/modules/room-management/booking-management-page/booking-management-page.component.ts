import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzDatePickerSizeType } from 'ng-zorro-antd/date-picker';
import { BookingService } from 'src/app/core/service/booking-management/booking.service';

@Component({
  selector: 'app-booking-management',
  templateUrl: './booking-management-page.component.html',
  styleUrls: ['./booking-management-page.component.scss']
})
export class BookingManagementPageComponent implements OnInit {
  
  size: NzButtonSize = 'large';
  breadcrumb: any = [];
  listOfData: any = [];
  formGroup: FormGroup = new FormGroup({
    fullname: new FormControl(''),
    roomType: new FormControl(''),
    status: new FormControl(''),
    startTime: new FormControl(''),
    endTime: new FormControl(''),
  });
  constructor(
    private router: Router,
    private bookingService: BookingService,
  ) { }

  ngOnInit(): void {
    this.breadcrumb = [
      {
        name: "Quản lý đặt phòng",
        // route: "/pages/room-management"
      }
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

    this.getBooking();

  }

  sortChange(e: any) {
    
  }

  addBooking() {
    this.router.navigate(['pages/room-management/add-booking']);
  }

  updateBooking(data: any) {
    const params = {
      id: data.id,
    }
    this.router.navigate(['pages/room-management/update-booking'], {queryParams: params});
  }

  getBooking() {
    this.bookingService.bookingDetail(1).subscribe(res => {
      if (res.code == 200) {
        console.log(res.data);
      }
    })
  }

}
