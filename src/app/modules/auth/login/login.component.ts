import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
// import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/auth-guard/auth.service';
import constants from 'src/app/core/constants/constants';
import { REGEX_PATTERN } from 'src/app/shared/constains/pattern.constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  currentTab: number = 1;

  formLogin: FormGroup = new FormGroup({
    email: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(100),
        Validators.pattern(REGEX_PATTERN.EMAIL),
      ],
    }),
    password: new FormControl('')
  })

  formRegister: FormGroup = new FormGroup({
    email: new FormControl(''),
    fullname: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  })

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private route: Router,
    // private toast: ToastrService
  ) { 
    if (localStorage.getItem('lang')) {
      this.translate.use(localStorage.getItem('lang')!);
    } else {
      localStorage.setItem('lang', 'vi');
      this.translate.use('vi');
    }
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.formLogin = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required]
      }),
      password: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern(''),
        ],
      }),
    });

    this.formRegister = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required]
      }),
      fullname: new FormControl('', {
        validators: [Validators.required]
      }),
      password: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern(''),
        ],
      }),
      confirmPassword: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern(''),
        ],
      }),
    })
  }

  handleLogin() {
    let formValue = this.formLogin.value;
    const body = {
      email: formValue.email,
      password: formValue.password,
    }

    this.authService.login(body).subscribe(res => {
      console.log(res.data);
      if (res.code == 200) {
        // this.toast.success("Đăng nhập thành công", "Thành công");
        this.route.navigate(['/pages/revenue']);
        localStorage.setItem(constants.TOKEN, res.data.token);

      } else if (res.code == 400) {
        // this.toast.error("Mật khẩu không đúng", "Lỗi");
      } else if (res.code == 401) {
        // this.toast.error("Tài khoản không tồn tại", "Lỗi");
      }
    })
  }

}
