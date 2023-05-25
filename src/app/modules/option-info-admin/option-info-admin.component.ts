import {
  AfterViewChecked,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import constants from 'src/app/core/constants/constants';
import { AuthService } from 'src/app/core/auth-guard/auth.service';
import { REGEX_PATTERN } from 'src/app/shared/constains/pattern.constant';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {DomSanitizer} from "@angular/platform-browser";
// import {DatePipe, Location} from "@angular/common";
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { config } from 'src/app/core/constants/tost.config';
import { focusElement } from 'src/app/shared/util/focus-element';
import handle from 'src/app/core/functions/handle';

@Component({
  selector: 'app-option-info-admin',
  templateUrl: './option-info-admin.component.html',
  styleUrls: ['./option-info-admin.component.scss'],
})
export class OptionInfoAdminComponent implements OnInit, AfterViewChecked {
  @ViewChild('toggleButton') toggleButton!: ElementRef;
  @ViewChild('infOption') infOption: any;
  @ViewChild('menu') menu!: ElementRef;
  @Input() nameUser = '';
  @Input() hiddenAll: any = false;
  @Input() forgotPass: any = false;
  @Input() userNameForgot: any = '';
  @Input() activateKey: any = '';
  @Input() modalName: any = '';
  @Input() linkExpired: any = false;
  @Input() isValidate: any = false;
  timeInterval: any;
  objectId: any = '';
  fullName: any = localStorage.getItem(constants.FULLNAME);

  @HostListener('window:resize', [])
  onResize() {
    this.setDivWidthHeight();
  }

  ngAfterViewChecked() {
    this.setDivWidthHeight();
  }

  setDivWidthHeight() {
    let width = `${this.infOption.nativeElement.offsetWidth}px`;
    this.renderer.setStyle(this.toggleButton.nativeElement, 'width', width);
    let height = `${this.infOption.nativeElement.offsetHeight}px`;
    this.renderer.setStyle(this.toggleButton.nativeElement, 'height', height);
  }

  form!: FormGroup;
  lang: string = ''
  languageCurrent: any
  userName: any = localStorage.getItem(constants.USERNAME);
  is2FA: any = 'off';
  isGoogleAuth: any = false;
  userId: any = '';
  days: any = '';
  passwordExpire: any = false;
  dataOption2Layers: any[] = [];
  checkMode: boolean = false;
  type2FA: any;
  phone: any;
  email: any;

  constructor(
    private route: Router,
    private authService: AuthService,
    private renderer: Renderer2,
    private translate: TranslateService,
    // private languageService: LanguageService,
    private toast: ToastrService,
    private sanitizer: DomSanitizer,
    // public datePipe: DatePipe,
    private el: ElementRef,
    // private location: Location,
  ) {
    this.languageCurrent = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'vi';
    this.lang = localStorage.getItem('lang')!;
    this.translate.use(this.lang);
  }

  title = '';
  size: any = "md";
  sizeInput: any = 'xl';
  value = 'email';
  sizeForm: NzSizeLDSType = 'default';
  placeholder = '';
  remember = false;


  dataOptions: any[] = [];

  ngOnInit() {

  }

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.renderer.listen('window', 'click', (e: Event) => {
      if (e.target !== this.toggleButton.nativeElement && e.target !== this.menu.nativeElement) {
        this.isMenuOpen = false;
      }
    });
  }

  hideOption(modalName: any) {
    if (modalName === 'logout') {
      this.showLogout = true;
      setTimeout(() => {
        focusElement('.btn-cancel');
      }, 500)
    }
  }

  changeLanguage(chooseLanguage: string) {
    localStorage.setItem('lang', chooseLanguage);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  formGroupPassword: FormGroup = new FormGroup({
    rePassword: new FormControl('', {
      validators: [Validators.required, Validators.pattern(REGEX_PATTERN.PASSWORD)],
    }),
    newPassword: new FormControl('', {
      validators: [Validators.required, Validators.pattern(REGEX_PATTERN.PASSWORD)],
    }),
    oldPassword: new FormControl('', {
      validators: [Validators.required, Validators.pattern(REGEX_PATTERN.PASSWORD)],
    }),
  })

  formGroupSetting: FormGroup = new FormGroup({
    checkboxNotif: new FormControl(0, {}),
    radioMode: new FormControl(1, {}),
    notif: new FormControl(1, {
      validators: [Validators.required],
    }),
    checkboxOtp: new FormControl(0, {}),
    otp: new FormControl(1, {
      validators: [Validators.required],
    },),
  })

  // validate old password
  validateOldPass: string = '';

  validateOldPassword() {
    let oldPassControl = this.formGroupPassword.controls['oldPassword'];

    // bi bat loi focus valid nen comment lai
    // if (!oldPassControl?.touched && !oldPassControl?.dirty) {
    //   return;
    // }

    // for (let validate in PATTERNS.LIST) {
    //   if (oldPassControl.hasError(PATTERNS.LIST[validate])) {
    //     this.validateOldPass = `currentPassword.validate.${PATTERNS.LIST[validate]}`;
    //     // console.log(this.validateOldPass)
    //     return true;
    //   }
    // }
    return false;
  }

  // validate password nhap lai mk
  validatePass: string = '';

  validateConfirmPassword() {
    let newPassControl = this.formGroupPassword.controls['newPassword'];
    let rePassControl = this.formGroupPassword.controls['rePassword'];

    // if (!rePassControl?.touched && !rePassControl?.dirty) {
    //   return false;
    // }

    // for (let validate in PATTERNS.LIST) {
    //   if (rePassControl.hasError(PATTERNS.LIST[validate])) {
    //     this.validatePass = `reNewPassword.validate.${PATTERNS.LIST[validate]}`;
    //     return true;
    //   }
    // }

    //da nhap new pass
    if (!newPassControl?.value) {
      return false;
    }

    if (newPassControl?.value !== rePassControl?.value) {
      this.validatePass = `newPassword.validate.match-rePassword`;
      rePassControl?.setErrors({'match-rePassword': true});
      return true;
    } else {
      rePassControl?.setErrors(null);
    }

    return false;
  }

  // validate mat khau moi
  validateNewPass: string = '';

  validateNewPassword() {
    let newPassControl = this.formGroupPassword.controls['newPassword'];
    let passControl = this.formGroupPassword.controls['oldPassword'];

    // if (!newPassControl?.touched && !newPassControl?.dirty) {
    //   return;
    // }

    // for (let validate in PATTERNS.LIST) {
    //   if (newPassControl.hasError(PATTERNS.LIST[validate])) {
    //     this.validateNewPass = `newPassword.validate.${PATTERNS.LIST[validate]}`;
    //     return true;
    //   }
    // }

    //check da nhap mat khau
    if (!passControl?.value) {
      return false;
    }

    if (newPassControl?.value === passControl?.value) {
      this.validateNewPass = `newPassword.validate.match-password`;
      newPassControl?.setErrors({'match-password': true});
      return true;
    } else {
      newPassControl?.setErrors(null);
    }

    return false;
  }

  isShowPassword = false;

  showPassword() {
    this.isShowPassword = !this.isShowPassword;
  }

  isShowNewPassword = false;

  showNewPassword() {
    this.isShowNewPassword = !this.isShowNewPassword;
  }

  isShowAgainNewPassword = false;

  showAgainNewPassword() {
    this.isShowAgainNewPassword = !this.isShowAgainNewPassword;
  }

  oldPassword(event: any) {
    this.formGroupPassword.addControl('password', event);
  }

  checkbox: boolean = true

  verifyPassword() {

    if (this.forgotPass) {
      this.formGroupPassword.get("oldPassword")?.setErrors(null);
      this.formGroupPassword.get("oldPassword")?.clearValidators();
    }
    // // validate form
    for (const i in this.formGroupPassword.controls) {
      this.formGroupPassword.controls[i].markAsTouched();
      this.formGroupPassword.controls[i].markAsDirty();
      this.formGroupPassword.updateValueAndValidity();
    }

    if (this.formGroupPassword.invalid) {
      //valid password -> function valid khong hoat dong
      if (this.formGroupPassword.value.oldPassword === null || this.formGroupPassword.value.oldPassword === ''
        || this.formGroupPassword.value.rePassword === null || this.formGroupPassword.value.rePassword === ''
        || this.formGroupPassword.value.newPassword === null || this.formGroupPassword.value.newPassword === '') {
        this.formGroupPassword.patchValue({
          oldPassword: '',
          rePassword: '',
          newPassword: ''
        });
      }

      for (const name in this.formGroupPassword.controls) {

        //form control dao nguoc nen khong dung break
        if (this.formGroupPassword.controls[name].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + name + '"]');
          invalidControl.focus();
        }
      }
      return;
    }

    const body = {
      passwordNew: this.formGroupPassword.get('newPassword')?.value,
      email: this.email
    };
    // this.authService.checkMatchPassword(body).subscribe(res => {
    //   console.log(`res.messageCode`, res.messageCode)
    //   //match password -> messageCode = 526
    //   if (res.messageCode == 526) {
    //     this.changePassword();
    //   } else {
    //     this.formGroupPassword.controls.oldPassword.setErrors({'incorrect': true});
    //     // this.toast.error(this.translate.instant('currentPassword.validate.incorrect'), this.translate.instant('error'), config);
    //   }
    // });
  }

  changePassword() {
    let password = this.formGroupPassword.get('oldPassword')?.value;
    let newPassword = this.formGroupPassword.get('newPassword')?.value;

    let body = {
      userName: localStorage.getItem(constants.USERNAME),
      passwordOld: password,
      passwordNew: newPassword,
    };
  }

  /**
   * notification
   */
  notif: number = 0;
  otp: number = 0;

  chooseNotification(event: any) {
    if (event[0] == 'notification') {
      this.formGroupSetting.get('notif')?.setValue(1);
      this.notif = 1
    } else {
      this.notif = 0
    }
  }

  chooseIS2A(event: any) {
    if (event[0] == 'is2a') {
      this.formGroupSetting.get('otp')?.setValue(1);
      this.otp = 1
    } else {
      this.isGoogleAuth = false;
      this.otp = 0
    }
  }

  getNotification() {
  }

  imageSource: any = '';

  logout() {

  }

  clearInput() {
    this.formGroupPassword.reset();
    this.isShowNewPassword = false
    this.isShowAgainNewPassword = false
  }

  btnCancelAccSetting() {
    // this.getNotification();
    this.isGoogleAuth = false;
  }

  showLogout: boolean = false;

  handleCancel() {
    this.showLogout = false;
  }

  confirmLogout() {
    // handle.logout;
    this.showLogout = false;
    this.route.navigate(['/auth/login']);
    localStorage.clear();
  }
}
