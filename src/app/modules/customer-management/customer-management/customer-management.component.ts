import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { BookingService } from 'src/app/core/service/booking-management/booking.service';

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
    code: new FormControl(''),
    fullName: new FormControl(''),
    roomType: new FormControl(''),
  });
  pageSize = 10;
  pageIndex = 1;
  sort: any = "id,desc";
  totalItem: any = 0;
  constructor(
    private router: Router,
    private bookingService: BookingService,
  ) { }

  ngOnInit(): void {
    this.breadcrumb = [
      {
        name: "Quản lý khách hàng",
        // route: "/pages/room-booking"
      },
      {
        name: "Danh sách khách hàng",
        // route: "/pages/room-booking"
      }
    ]

    this.getAllBookingRoom();
  }

  sortChange(e: any) {
    if (e.value === 'ascend') {
      e.value = 'asc';
    } else if (e.value === 'descend') {
      e.value = 'desc';
    }
    this.sort = `${e.key}, ${e.value}`;
    console.log(e);
    this.getAllBookingRoom();
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
    this.getAllBookingRoom();
  }

  getAllBookingRoom() {
    const formValue = this.formGroup.value;
    const data = {
      page: this.pageIndex,
      size: this.pageSize,
      sort: this.sort,
      customerId: formValue.customerId ? formValue.customerId : "",
      code: formValue.code ? formValue.code : "",
      status: formValue.status ? formValue.status : "",
      startTime: formValue.startTime ? formValue.startTime : "",
      endTime: formValue.endTime ? formValue.endTime : "",
    }
    
    this.bookingService.getListBookingRoom(data).subscribe(res => {
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
    this.getAllBookingRoom()
  }

  changeItemPerPage(itemPerPage: number) {
    this.pageIndex = 1;
    this.pageSize = itemPerPage;
    // call event rule engine
    // this.createData();
    
    // call event service
    this.getAllBookingRoom()
  }

}
