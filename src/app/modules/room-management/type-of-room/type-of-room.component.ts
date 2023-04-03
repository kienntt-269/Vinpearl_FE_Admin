import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { RoomService } from 'src/app/core/service/room-management/room.service';


@Component({
  selector: 'app-type-of-room',
  templateUrl: './type-of-room.component.html',
  styleUrls: ['./type-of-room.component.scss']
})
export class TypeOfRoomComponent implements OnInit {

  size: NzButtonSize = 'large';
  breadcrumb: any = [];
  listOfData: any[] = [];
  pageSize: any = 10;
  pageIndex: any = 0;
  sort: any = "id,desc";
  totalItem: any = 0;
  formGroup: FormGroup = new FormGroup({
    name: new FormControl(''),
    numberPerson: new FormControl(''),
    hotelName: new FormControl(''),
    startTime: new FormControl(''),
    endTime: new FormControl(''),
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

  updateTypeOfRoom(data: any, check: any) {
    const params = {
      id: data.id,
      action: check == 1 ? "PROCESS" : "DETAIL",
    }
    this.router.navigate(['pages/room-management/update-type-of-room'], {queryParams: params});
  }

  serviceNameList: any[] = [];

  getRoomType() {
    const formValue = this.formGroup.value;
    if (typeof(formValue.startTime) === "object" && formValue.startTime != null) {
      formValue.startTime = formValue.startTime.getTime();
    }
    if (typeof(formValue.endTime) === "object" && formValue.endTime != null) {
      formValue.endTime = formValue.endTime.getTime();
    }

    const data = {
      name: formValue.name,
      numberPerson: formValue.numberPerson,
      hotelName: formValue.hotelName,
      startTime: formValue.startTime,
      endTime: formValue.endTime,
      page: this.pageIndex,
      size: this.pageSize,
      sort: this.sort,
    }
    this.roomService.getListRoomType(data).subscribe(res => {
      if (res.code == 200) {
        this.listOfData = res.data.content;
        this.totalItem = res.data.totalElements;
        // res.data.content.forEach((item: any) => {
        //   this.serviceNameList = item.service.map((serviceName: any) => serviceName.name);
        //   // this.listOfData.push(item);
        // })
      }
    })
  }

  changeCurrentPage(currentPage: number) {
    this.pageIndex = currentPage - 1;
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

  search() {
    this.pageSize = 10;
    this.pageIndex = 0;
    this.getRoomType();
  }
}
