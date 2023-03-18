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

  updateRoom(data: any) {
    const params = {
      id: data.id,
    }
    this.router.navigate(['pages/room-management/update-room'], {queryParams: params});
  }

  getRoom() {
    const formValue = this.formGroup.value;
    this.roomService.getListRoom(this.pageSize, this.pageIndex, this.sort, formValue.name, formValue.numberOfRooms, formValue.phone).subscribe(res => {
      if (res.code == 200) {
        this.listOfData = res.data.content;
        this.totalItem = res.data.totalElements;
      }
    })
  }

  changeCurrentPage(currentPage: number) {
    this.pageIndex = currentPage;
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
}
