import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/core/service/account-management/account.service';
import { REGEX_PATTERN } from 'src/app/shared/constains/pattern.constant';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent implements OnInit {

  breadcrumb: any = [];
  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
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
    phone: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(12),
      ],
    }),
    cccd: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(12),
      ],
    }),
  });

  addAccount() {
    const formValue = this.formGroup.value;
    const body = {
      email: formValue.email,
      fullName: formValue.fullName,
      password: formValue.password,
      phone: formValue.phone,
      cccd: formValue.cccd,
    }

    this.accountService.addAccount(body).subscribe(res => {
      console.log(res)
    })
  }

}
