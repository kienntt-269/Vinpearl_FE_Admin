import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { AuthService } from 'src/app/core/auth-guard/auth.service';
import { HotelService } from 'src/app/core/service/hotel-management/hotel.service';

@Component({
  selector: 'app-account-management-page',
  templateUrl: './account-management-page.component.html',
  styleUrls: ['./account-management-page.component.scss']
})
export class AccountManagementPageComponent implements OnInit {

  size: NzButtonSize = 'large';
  breadcrumb: any = [];
  listOfData: any = [];
  listOfSite: any[] = [];
  formGroup: FormGroup = new FormGroup({
    fullName: new FormControl(''),
    phone: new FormControl(''),
    siteId: new FormControl(''),
  });
  pageSize = 10;
  pageIndex = 1;
  sort: any = "id,desc";
  totalItem: any = 0;

  // @Output() changeItemPerPage: EventEmitter<number> = new EventEmitter<number>();
  // @Output() changeCurrentPage: EventEmitter<number> = new EventEmitter<number>();      // Gửi currentPage lên cho parent component

  changeCurrentPage(currentPage: number) {
    this.pageIndex = currentPage;
    // call event rule engine
    // this.createData();

    // call event service
    this.getListAccount()
  }

  changeItemPerPage(itemPerPage: number) {
    this.pageIndex = 1;
    this.pageSize = itemPerPage;
    // call event rule engine
    // this.createData();

    // call event service
    this.getListAccount()
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private hotelService: HotelService,
  ) { }

  ngOnInit(): void {
    this.breadcrumb = [
      {
        name: "Quản lý tài khoản",
        // route: "/pages/room-booking"
      },
      {
        name: "Danh sách tài khoản",
        // route: "/pages/room-booking"
      }
    ]

    this.getListAccount();
    this.hotelService.getAllSite().subscribe(res => {
      if (res.code === 200) {
        this.listOfSite = res.data;
      }
    })
  }

  sortChange(e: any) {

  }

  search() {
    this.getListAccount();
  }

  addAccount() {
    this.router.navigate(['pages/account-management/add-account']);
  }

  getListAccount() {
    const formValue = this.formGroup.value;
    const body = {
      name: formValue.fullName,
      phone: formValue.phone,
      siteId: formValue.siteId,
      page: this.pageIndex - 1,
      size: this.pageSize,
      sort: this.sort,
    }
    this.authService.getListAccount(body).subscribe(res => {
      if (res.code == 200) {
        this.listOfData = res.data.content;
        this.totalItem = res.data.totalElements;
      }
    })
  }

  updateAccount(data: any, check: any) {
    const params = {
      id: data.id,
      action: check == 1 ? "PROCESS" : "DETAIL",
    }
    this.router.navigate(['pages/account-management/add-account'], {queryParams: params});
  }
}

