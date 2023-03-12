import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { HotelService } from 'src/app/core/service/hotel-management/hotel.service';
import { RoomService } from 'src/app/core/service/room-management/room.service';

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
  pageSize: any = 10;
  pageIndex: any = 0;
  sort: any = "id,asc";
  formGroup: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
  });
  constructor(
    private router: Router,
    private roomService: RoomService,
  ) { }

  ngOnInit(): void {
    this.breadcrumb = [
      {
        name: "Quản lý phòng",
        // route: "/pages/room-booking"
      },
      {
        name: "Danh sách dịch vụ",
        // route: "/pages/room-booking"
      }
    ]

    this.listOfData = [];

    this.getAllService();
  }

  sortChange(e: any) {
    
  }

  addService() {
    this.router.navigate(['pages/room-management/save-service']);
  }

  updateService(data: any) {
    const params = {
      id: data.id,
    }
    this.router.navigate(['pages/room-management/save-service'], {queryParams: params});
  }

  search() {
    this.getAllService();
  }

  getAllService() {
    const data = {
      numRoom: this.numberRoom,
      name: this.numberRoom,
      phone: this.numberRoom,
      pageIndex: this.numberRoom,
      pageSize: this.numberRoom,
    }
    this.roomService.search(this.pageSize, this.pageIndex, this.sort).subscribe(res => {
      if (res.code == 200) {
        res.data.content.forEach((item: any) => {
          item.descriptions = item.descriptions.map((item: any) => item.name);
        })
        this.listOfData = res.data.content;
        console.log(res.data.content);
      }
    })
  }
}


