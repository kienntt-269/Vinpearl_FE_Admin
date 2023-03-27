import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { AuthService } from 'src/app/core/auth-guard/auth.service';

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.scss']
})
export class CustomerManagementComponent implements OnInit {

  size: NzButtonSize = 'large';
  breadcrumb: any = [];
  listOfData: any = [];
  formGroup: FormGroup = new FormGroup({
    fullName: new FormControl(''),
    phone: new FormControl(''),
    hotel: new FormControl(''),
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

    this.getListAccount();
  }

  sortChange(e: any) {
    
  }

  getListAccount() {
    const body = {
      name: "",
      phone: "",
      page: this.pageIndex - 1,
      size: this.pageSize,
    }
    this.authService.getListAccount(body).subscribe(res => {
      if (res.code == 200) {
        this.listOfData = res.data.content;
        this.totalItem = res.data.totalElements;
      }
    })
  }

  updateAccount(data: any) {
    const params = {
      id: data.id,
    }
    this.router.navigate(['pages/customer-management/save-customer'], {queryParams: params});
  }
}

