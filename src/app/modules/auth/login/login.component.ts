import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/auth-guard/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  currentTab: number = 1;

  formLogin: FormGroup = new FormGroup({
    email: new FormControl(''),
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

  clickTab(tab: number) {
    this.currentTab = tab;
    const listNav = document.querySelectorAll('.nav__item');
    listNav.forEach((el) => {
      el.classList.remove('active');
    })
    document.getElementById(`nav__item__${tab}`)?.classList.add('active');
    this.formLogin.reset();
    this.formLogin.reset();
  }

  handleLogin() {
    let formValue = this.formRegister.value;
    const body = {
      email: formValue.email,
      password: formValue.password,
    }

    this.authService.login(body).subscribe(res => {
      console.log(res.data);
      if (res.code == 200) {
      }
    })
  }

  handleRegister() {
    let formValue = this.formRegister.value;
    const body = {
      email: formValue.email,
      fullName: formValue.fullname,
      password: formValue.password,
    }

    this.authService.register(body).subscribe(res => {
      console.log(res.data);
      if (res.code == 200) {
      }
    })
  }

}
