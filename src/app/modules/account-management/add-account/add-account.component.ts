import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import constants from 'src/app/core/constants/constants';
import { AccountService } from 'src/app/core/service/account-management/account.service';
import { HotelService } from 'src/app/core/service/hotel-management/hotel.service';
import { REGEX_PATTERN } from 'src/app/shared/constains/pattern.constant';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent implements OnInit {

  breadcrumb: any = [];
  listOfPermission: any[] = [];
  listOfHotel: any[] = [];
  listOfSite: any[] = [];
  listOfSex: any[] = [
    {
      id: 1,
      name: "Nam",
    },
    {
      id: 2,
      name: "Nữ",
    },
    {
      id: 3,
      name: "Không xác định",
    },
  ];
  userId: any;
  passwordVisible = false;
  passwordConfirmVisible = false;
  userDetail: any;
  pageSize = 10;
  pageIndex = 1;
  sort: any = "id,desc";
  totalItem: any = 0;
  constructor(
    private accountService: AccountService,
    private hotelService: HotelService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = params['id'];
      if (this.userId) {
        this.breadcrumb = [
          {
            name: "Quản lý tài khoản",
            // route: "/pages/room-booking"
          },
          {
            name: "Cập nhật phòng",
            // route: "/pages/room-booking"
          }
        ]
        this.getDetailUser(this.userId);
      } else {
        this.breadcrumb = [
          {
            name: "Quản lý đặt phòng",
            // route: "/pages/room-booking"
          },
          {
            name: "Thêm mới phòng",
            // route: "/pages/room-booking"
          }
        ]
      }
    });
    this.accountService.getListPermission().subscribe(res => {
      if (res.code === 200) {
        res.data.forEach((item: any) => {
          const data = {
            id: item.id,
            name: item.name,
          }
          this.listOfPermission.push(data);
        })
      }
    })
    this.hotelService.getAllSite().subscribe(res => {
      if (res.code === 200) {
        this.listOfSite = res.data;
      }
    })
  }

  getAllHotel(siteId: Number) {
    this.listOfHotel = [];
    this.hotelService.getListHotel(100, 0, this.sort, siteId, "", "", "").subscribe(res => {
      if (res.code === 200) {
        // console.log(res.data.content);
        this.listOfHotel = res.data.content;
      }
    });
  }

  getHotel(event: any) {
    this.getAllHotel(event);
  }

  formGroup: FormGroup = new FormGroup({
    email: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(100),
        Validators.pattern(REGEX_PATTERN.EMAIL),
      ],
    }),
    fullName: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(255),
      ],
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(255),
      ],
    }),
    confirmPassword: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(255),
      ],
    }),
    birthDate: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    permission: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    sex: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    phone: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(12),
        Validators.pattern(REGEX_PATTERN.PHONE)
      ],
    }),
    site: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    hotel: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
  });

  getDetailUser(id: any) {
    this.accountService.getDetailUser(id).subscribe(res => {
      if (res.code === 200) {
        this.userDetail = res.data;
        // this.getAllHotel(res.data.site.id);
        
        this.formGroup.patchValue({
          email: res.data.email,
          fullName: res.data.fullName,
          password: res.data.password,
          phone: res.data.phone,
          birthDate: res.data.birthDate,
          sex: res.data.sex,
          cccd: res.data.cccd,
          permission: res.data.role.id,
          hotel: res.data.hotel.id,
          site: res.data.site.id,
        })
      }
    })
  }

  cancel() {
    this.router.navigate(['/pages/account-management']);
  }

  addAccount() {
    const formValue = this.formGroup.value;
    
    // if (this.formGroup.invalid) {
    //   for (const control of Object.keys(this.formGroup.controls)) {
    //     this.formGroup.controls[control].markAsTouched();
    //   }
    //   return;
    // }

    if (typeof(formValue.birthDate) === "object") {
      formValue.birthDate = formValue.birthDate.getTime();
    }

    formValue.hotelId = localStorage.getItem(constants.HOTEL_ID);
    
    const body = {
      email: formValue.email,
      fullName: formValue.fullName,
      password: formValue.password,
      phone: formValue.phone,
      birthDateLong: formValue.birthDate,
      sex: formValue.sex,
      cccd: formValue.cccd,
      roleId: formValue.permission,
      siteId: formValue.site,
      hotelId: formValue.hotel,
    }

    this.accountService.addAccount(body).subscribe(res => {
      if(res.code === 200) {
        this.toast.success('Thành công', 'Thông báo');
        this.router.navigate(['/pages/account-management']);
      }
      if (res.code == 400) {
        this.toast.success('Lỗi', 'Thông báo');
      }
    })
  }

}
