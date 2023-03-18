import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzDatePickerSizeType } from 'ng-zorro-antd/date-picker';
import { BookingService } from 'src/app/core/service/booking-management/booking.service';
import { RoomService } from 'src/app/core/service/room-management/room.service';


@Component({
  selector: 'app-type-of-room',
  templateUrl: './type-of-room.component.html',
  styleUrls: ['./type-of-room.component.scss']
})
export class TypeOfRoomComponent implements OnInit {

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
        name: "Quản lý phòng",
        // route: "/pages/room-booking"
      },
      {
        name: "Danh sách loại phòng",
        // route: "/pages/room-booking"
      }
    ]

    this.getRoomType();
  }

  sortChange(e: any) {
    
  }

  addRoom() {
    this.router.navigate(['pages/room-management/add-type-of-room']);
  }

  updateRoom(data: any) {
    const params = {
      id: data.id,
    }
    this.router.navigate(['pages/room-management/update-type-of-room'], {queryParams: params});
  }

  getRoomType() {
    const formValue = this.formGroup.value;
    const data = {
      name: formValue.name ? formValue.name : "",
      numberOfRooms: formValue.numberOfRooms ? formValue.numberOfRooms : "",
      phone: formValue.phone ? formValue.phone : "",
    }
    this.roomService.getListRoomType(this.pageSize, this.pageIndex, this.sort, data.name, data.numberOfRooms, data.phone).subscribe(res => {
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
    this.getRoomType()
  }

  changeItemPerPage(itemPerPage: number) {
    this.pageIndex = 1;
    this.pageSize = itemPerPage;
    // call event rule engine
    // this.createData();
    
    // call event service
    this.getRoomType()
  }
}
