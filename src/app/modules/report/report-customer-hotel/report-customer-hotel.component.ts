import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { BookingService } from 'src/app/core/service/booking-management/booking.service';

@Component({
  selector: 'app-report-customer-hotel',
  templateUrl: './report-customer-hotel.component.html',
  styleUrls: ['./report-customer-hotel.component.scss']
})
export class ReportCustomerHotelComponent implements OnInit {

  numberRoom: any;
  size: NzButtonSize = 'large';
  breadcrumb: any = [];
  listOfData: any = [];
  formGroup: FormGroup = new FormGroup({
    startDate: new FormControl(new Date().getTime() - 86400000 * 30),
    endDate: new FormControl(new Date().getTime()),
    status: new FormControl('1'),
  });
  pageSize = 10;
  pageIndex = 1;
  sort: any = "id,desc";
  totalItem: any = 0;
  constructor(
    private router: Router,
    private bookingService: BookingService,
    public datepipe: DatePipe,
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
      page: this.pageIndex - 1,
      size: this.pageSize,
      sort: this.sort,
      status: formValue.status,
      startDate: formValue.startDate ? this.datepipe.transform(formValue.startDate, 'yyyy-MM-dd') : "",
      endDate: formValue.endDate ? this.datepipe.transform(formValue.endDate, 'yyyy-MM-dd') : "",
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

  exportFile() {
    const formValue = this.formGroup.value;
    const data = {
      status: formValue.status ? parseInt(formValue.status) : null,
      startDate: formValue.startDate ? this.datepipe.transform(formValue.startDate, 'yyyy-MM-dd') : null,
      endDate: formValue.endDate ? this.datepipe.transform(formValue.endDate, 'yyyy-MM-dd') : null,
    }

    this.bookingService.exportFile(data).subscribe(res => {
      const url = window.URL.createObjectURL(res);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'baocao.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    })
  }

}
