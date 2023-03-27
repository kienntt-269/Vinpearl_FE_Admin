import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzDatePickerSizeType } from 'ng-zorro-antd/date-picker';
import { BookingService } from 'src/app/core/service/booking-management/booking.service';
import { RoomService } from 'src/app/core/service/room-management/room.service';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  size: NzButtonSize = 'large';
  breadcrumb: any = [];
  listOfData: any = [];
  pageSize: any = 10;
  pageIndex: any = 0;
  sort: any = "id,desc";
  totalItem: any = 0;
  formGroup: FormGroup = new FormGroup({
    roomName: new FormControl(''),
    roomType: new FormControl(''),
    status: new FormControl(''),
  });
  constructor(
    private router: Router,
    private roomService: RoomService,
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

    this.listOfData = [];

    this.getRoom();
  }

  sortChange(e: any) {
    
  }

  addRoom() {
    this.router.navigate(['pages/room-management/add-room']);
  }

  updateRoom(data: any, check: any) {
    const params = {
      id: data.id,
      action: check == 1 ? "PROCESS" : "DETAIL",
    }
    this.router.navigate(['pages/room-management/update-room'], {queryParams: params});
  }

  getRoom() {
    const formValue = this.formGroup.value;
    const data = {
      name: formValue.roomName ? formValue.roomName : "",
      roomType: formValue.roomType ? formValue.roomType : "",
      status: formValue.status ? formValue.status : "",
      page: this.pageIndex,
      size: this.pageSize,
      sort: this.sort,
    }
    this.roomService.getListRoom(data).subscribe(res => {
      if (res.code == 200) {
        this.listOfData = res.data.content;
        this.totalItem = res.data.totalElements;
      }
    })
  }

  changeCurrentPage(currentPage: number) {
    this.pageIndex = currentPage - 1;
    // call event rule engine
    // this.createData();

    // call event service
    this.getRoom()
  }

  changeItemPerPage(itemPerPage: number) {
    this.pageIndex = 1;
    this.pageSize = itemPerPage;
    // call event rule engine
    // this.createData();
    
    // call event service
    this.getRoom()
  }

  search() {
    this.pageSize = 10;
    this.pageIndex = 0;
    this.getRoom();
  }
}
