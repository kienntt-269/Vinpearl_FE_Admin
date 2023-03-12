import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import constants from 'src/app/core/constants/constants';
import { HotelService } from 'src/app/core/service/hotel-management/hotel.service';

@Component({
  selector: 'app-hotel-management-page',
  templateUrl: './hotel-management-page.component.html',
  styleUrls: ['./hotel-management-page.component.scss']
})
export class HotelManagementPageComponent implements OnInit {

  numberRoom: any;
  size: NzButtonSize = 'large';
  breadcrumb: any = [];
  listOfData: any = [];
  pageSize: any = 10;
  pageIndex: any = 0;
  sort: any = "id,asc";
  formGroup: FormGroup = new FormGroup({
    name: new FormControl(''),
    totalRoom: new FormControl(''),
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

    this.getAllHotel();
  }

  sortChange(e: any) {
    
  }

  addHotel() {
    this.router.navigate(['pages/hotel-management/save-hotel']);
  }

  updateHotel(data: any, check: any) {
    const params = {
      id: data.id,
      action: check == 1 ? "PROCESS" : "DETAIL",
    }
    this.router.navigate(['pages/hotel-management/save-hotel'], {queryParams: params});
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
    const formValue = this.formGroup.value;
    
    this.hotelService.getListHotel(this.pageSize, this.pageIndex, this.sort, formValue.name, formValue.totalRoom, formValue.phone).subscribe(res => {
      if (res.code == 200) {
        this.listOfData = res.data.content;
        console.log(res.data.content);
      }
    })
  }
}

