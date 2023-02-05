import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-room-booking',
  templateUrl: './room-booking.component.html',
  styleUrls: ['./room-booking.component.scss']
})
export class RoomBookingComponent implements OnInit {
  
  size: NzButtonSize = 'large';
  breadcrumb: any = [];
  listOfData: any = [];
  listOfService: any = [];
  buildingNames: any = ['TOK1 - 18A', 'TOK2 - PKB', 'TOK3 - NTT', 'TOK4 - 360', 'TOK5 38/1A'];
  bookingId: any;
  isVisible: boolean = false;
  titleModal: any = localStorage.getItem('hotelName') ? localStorage.getItem('hotelName') : 'Vinpearl Discovery Wonderworld Phú Quốc';
  demoValue: Number = 1;
  formGroup: FormGroup = new FormGroup({
    buildingName: new FormControl(''),
    roomType: new FormControl(''),
    status: new FormControl(''),
    startTime: new FormControl(''),
    endTime: new FormControl(''),
  });

  listOfSelectedValue: any = [0];

  listOfOption: any = [
    {
      label: 'Trống',
      value: 0,
    },
    {
      label: 'Đang ở',
      value: 1,
    },
    {
      label: 'Đặt cọc',
      value: 2,
    },
    {
      label: 'Sắp Checkin',
      value: 3,
    },
    {
      label: 'Đến hạn Checkout',
      value: 4,
    },
    {
      label: 'Không xác định',
      value: 5,
    },
  ];
  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
  ) {
  if (localStorage.getItem('lang')) {
      translate.use(localStorage.getItem('lang')!);
    } else {
      localStorage.setItem('lang', 'vi');
      translate.use('vi');
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.bookingId = params.id;
    })
    this.breadcrumb = [
      {
        name: "Quản lý đặt phòng",
        // route: "/pages/room-management"
      },
      {
        name: "Sơ đồ phòng",
        // route: "/pages/room-management/room-plan"
      },
    ];

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

    this.listOfService = [
      {
        stt: 1,
        described: 'Bia Hà Nội',
        price: 20000,
      },
      {
        stt: 2,
        described: 'Bia Hà Nội',
        price: 20000,
      },
      {
        stt: 3,
        described: 'Bia Hà Nội',
        price: 20000,
      },
      {
        stt: 4,
        described: 'Bia Hà Nội',
        price: 20000,
      },
      {
        stt: 5,
        described: 'Bia Hà Nội',
        price: 20000,
      },
      {
        stt: 6,
        described: 'Bia Hà Nội',
        price: 20000,
      },
      {
        stt: 7,
        described: 'Bia Hà Nội',
        price: 20000,
      },
      {
        stt: 8,
        described: 'Bia Hà Nội',
        price: 20000,
      },
    ]
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

}
