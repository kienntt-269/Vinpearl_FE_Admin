import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { HotelService } from 'src/app/core/service/hotel-management/hotel.service';

@Component({
  selector: 'app-hotel-management-page',
  templateUrl: './hotel-management-page.component.html',
  styleUrls: ['./hotel-management-page.component.scss']
})
export class HotelManagementPageComponent implements OnInit {

  size: NzButtonSize = 'large';
  breadcrumb: any = [];
  listOfData: any = [];
  formGroup: FormGroup = new FormGroup({
    roomName: new FormControl(''),
    roomType: new FormControl(''),
    status: new FormControl(''),
  });
  constructor(
    private router: Router,
    private hotelService: HotelService,
  ) { }

  ngOnInit(): void {
    this.breadcrumb = [
      {
        name: "Quản lý đặt phòng",
        // route: "/pages/room-booking"
      },
      {
        name: "Danh sách phòng",
        // route: "/pages/room-booking"
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

    this.getAllHotel();
  }

  sortChange(e: any) {
    
  }

  addRoom() {
    this.router.navigate(['pages/room-management/add-room']);
  }

  updateRoom(data: any) {
    const params = {
      id: data.id,
    }
    this.router.navigate(['pages/room-management/update-room'], {queryParams: params});
  }

  search() {
    this.getAllHotel();
  }

  getAllHotel() {
    
    this.hotelService.getListHotel(340, '', '', 1 ,10).subscribe(res => {
      if (res.code == 200) {
        this.listOfData = res.data;
        console.log(res.data);
      }
    })
  }
}

