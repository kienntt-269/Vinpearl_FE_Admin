import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { HotelService } from 'src/app/core/service/hotel-management/hotel.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  numberRoom: any;
  size: NzButtonSize = 'large';
  breadcrumb: any = [];
  listOfData: any = [];
  pageSize: Number = 10;
  pageIndex: Number = 0;
  sort: any = "id, desc";
  formGroup: FormGroup = new FormGroup({
    name: new FormControl(''),
    roomTotal: new FormControl(''),
    phone: new FormControl(''),
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

  addService() {
    this.router.navigate(['pages/service/save-service']);
  }

  updateService(data: any) {
    const params = {
      id: data.id,
    }
    this.router.navigate(['pages/service/save-service'], {queryParams: params});
  }

  search() {
    this.getAllHotel();
  }

  getAllHotel() {
    // const data = {
    //   numRoom: this.numberRoom,
    //   name: this.numberRoom,
    //   phone: this.numberRoom,
    //   pageIndex: this.numberRoom,
    //   pageSize: this.numberRoom,
    // }
    // this.hotelService.getListHotel(this.pageSize, this.pageIndex, this.sort).subscribe(res => {
    //   if (res.code == 200) {
    //     this.listOfData = res.data.content;
    //     console.log(res.data.content);
    //   }
    // })
  }
}

