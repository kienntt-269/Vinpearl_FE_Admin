import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { HotelService } from 'src/app/core/service/hotel-management/hotel.service';

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.scss']
})
export class CustomerManagementComponent implements OnInit {

  numberRoom: any;
  size: NzButtonSize = 'large';
  breadcrumb: any = [];
  listOfData: any = [];
  formGroup: FormGroup = new FormGroup({
    name: new FormControl(''),
    roomTotal: new FormControl(''),
    phone: new FormControl(''),
  });
  pageSize: Number = 10;
  pageIndex: Number = 0;
  sort: any = "id, desc";
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
    if (e.value === 'ascend') {
      e.value = 'asc';
    } else if (e.value === 'descend') {
      e.value = 'desc';
    }
    this.sort = `${e.key}, ${e.value}`;
    console.log(e);
    this.getAllHotel();
  }

  addHotel() {
    this.router.navigate(['pages/hotel-management/save-hotel']);
  }

  updateRoom(data: any) {
    const params = {
      id: data.id,
    }
    this.router.navigate(['pages/hotel-management/save-hotel'], {queryParams: params});
  }

  search() {
    this.getAllHotel();
  }

  getAllHotel() {
    const data = {
      numRoom: this.numberRoom,
      name: this.numberRoom,
      phone: this.numberRoom,
      pageIndex: this.numberRoom,
      pageSize: this.numberRoom,
    }
    // this.hotelService.getListHotel(this.pageSize, this.pageIndex, this.sort).subscribe(res => {
    //   if (res.code == 200) {
    //     this.listOfData = res.data;
    //     console.log(res.data);
    //   }
    // })
  }

}
