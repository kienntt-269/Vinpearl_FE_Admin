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
// import {OPTIONS_EN, OPTIONS_EN_2_LAYER} from 'src/app/data/account/option-en';
// import {OPTIONS_VI, OPTIONS_VI_2_LAYER} from 'src/app/data/account/option-vi';
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
  @ViewChild("closePopup2") closePopup2!: ElementRef;
  @ViewChild("closePopup") closePopup!: ElementRef;
  @ViewChild('closePopupChangePassword') closePopupChangePassword!: ElementRef;
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
    this.languageCurrent = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'vi'
    // this.languageStore.dispatch(createLanguage(this.languageCurrent))
    // this.sharingService.currentLanguage(this.languageCurrent);
    this.setLabel();
    this.lang = localStorage.getItem('lang')!
    this.translate.use(this.lang)
    // this.translate.use(this.lang);
  }

  title = '';
  size: any = "md";
  sizeInput: any = 'xl';
  value = 'email';
  sizeForm: NzSizeLDSType = 'default';
  placeholder = '';
  remember = false;


  dataOptions: any[] = []

  ngOnInit() {
    this.email = atob(String(localStorage.getItem(constants.EMAIL)));
    this.phone = atob(String(localStorage.getItem(constants.PHONE)));
    if (this.forgotPass === true) {
      this.userName = this.userNameForgot;
    } else {
      this.nameUser = localStorage.getItem(constants.PERSON_NAME)!
      this.getNotification();
    }
    // this.email = localStorage.getItem(constants.USERNAME);
  }

  isMenuOpen = false;

  setLabel() {
    // this.sharingService.getCurrentLanguage().subscribe(mes => {
    //   if (mes == '') {
    //     this.lang = 'vi'
    //   } else {
    //     this.lang = mes;
    //   }
    //   this.translate.use(this.lang);
    //   this.dataOptions = (this.lang == 'vi') ? OPTIONS_VI : OPTIONS_EN
    //   this.dataOption2Layers = (this.lang == 'vi') ? OPTIONS_VI_2_LAYER : OPTIONS_EN_2_LAYER
    // });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.renderer.listen('window', 'click', (e: Event) => {
      if (e.target !== this.toggleButton.nativeElement && e.target !== this.menu.nativeElement) {
        this.isMenuOpen = false;
      }
    });
  }

  hideOption(modalName: any) {
    // this.isMenuOpen = false;
    // this.translate.instant('label.introduction');
    // // truong hop open modal doi pass khi da dang nhap thanh cong => focus truong mat khau hien tai
    // if (modalName === 'changePassword' && this.forgotPass === false) {
    //   setTimeout(() => {
    //     const control = this.el.nativeElement.querySelector('[formControlName="oldPassword"]');
    //     control.focus();
    //   }, 1000);
    // }

    // if (modalName === 'introduce') {
    //   setTimeout(() => {
    //     focusElement('.btn-cancel-introduce');
    //   }, 500)
    // }

    // if (modalName === 'accountSettings') {
    //   this.getNotification();
    //   setTimeout(() => {
    //     focusElement('.btn-cancel-setting');
    //   }, 500)
    // }
    if (modalName === 'logout') {
      this.showLogout = true;
      setTimeout(() => {
        focusElement('.btn-cancel');
      }, 500)
    }
  }

  changeLanguage(chooseLanguage: string) {
    // this.isMenuOpen = false;
    // this.translate.instant('label.introduction')
    // if (chooseLanguage == 'vi') {
    //   this.serverService.changeLangKey(true);
    // } else this.serverService.changeLangKey(false);
    // localStorage.setItem('lang', chooseLanguage);
    // this.languageCurrent = chooseLanguage;
    // this.sharingService.currentLanguage(this.languageCurrent);
    // this.languageService.changeLocale(chooseLanguage)
    // this.languageStore.dispatch(createLanguage(this.languageCurrent))
    // window.location.reload();
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

  formGroupVerify: FormGroup = new FormGroup({
    otpCode: new FormControl('', {
      validators: [Validators.required]
    })
  });

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

    //thuc hien doi pass trong truong hop gui link ve email
    if (this.forgotPass === true) {
      this.forgotPassword();
      // this.verifyOTP();
      return
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


  forgotPassword() {
    //truong hop link da qua 5p sau khi bam quen mat khau
    // if (this.linkExpired === true) {
    //   this.toast.error(this.translate.instant('forgotPassword.expired'), this.translate.instant('error'), config);
    //   return;
    // }
    // let newPassword = this.formGroupPassword.get('newPassword')?.value;
    // let body = {
    //   userName: this.userNameForgot,
    //   passwordNew: newPassword,
    //   activateKey: this.activateKey
    // };

    // this.authService.changePassword(body).subscribe(res => {
    //   if (res.code == 200) {
    //     if(res.messageCode == 408 || res.messageCode == 500 || res.messageCode == 0){
    //       // @ts-ignore
    //       document.getElementById('closeChangePass').click();

    //       this.formGroupVerify.get('otpCode')?.setValue('');

    //       setTimeout(() => {
    //         // @ts-ignore
    //         document.getElementById("openModalVerifyOtp").click();
    //       }, 700);

    //       //focus otp code
    //       setTimeout(() => {
    //         this.el.nativeElement.querySelector('[formControlName="otpCode"]').focus();
    //       }, 1000);

    //       this.objectId = res.data.objectId;

    //       if (res.message.includes('Send SMS Succes')) {
    //         this.timer(2);
    //         this.type2FA = 'SMS';
    //         this.phone = res.data.phoneNumber;
    //       } else if (res.message.includes('Send Mail Succes')) {
    //         this.timer(2);
    //         this.type2FA = 'Email';
    //         this.email = res.data.email;
    //       }
    //     } else {
    //       this.toast.success(this.translate.instant('toast.password.200'), this.translate.instant('success'), config);
    //       // @ts-ignore
    //       document.getElementById('closeChangePass').click();
    //       this.formGroupPassword.reset();
    //       //thuc hien logout trong truong hop quen mau khau-> redirect ve login
    //       handle.logout();
    //     }
    //   } else if (res.code == 400 && res.messageCode == 532) {
    //     this.toast.error(this.translate.instant('forgotPassword.code.400'), this.translate.instant('error'), config);
    //     setTimeout(() => {
    //       this.isLinkExpire();
    //     }, 1000)
    //   } else if (res.code == 400 && (res.messageCode == 515 || res.messageCode == 409)) {
    //     this.toast.error(this.translate.instant(`forgotPassword.change.failed`), this.translate.instant('error'), config);
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

    //xac thuc 2 buoc can confirm otp -> close modal otp hoac modal doi mat khau
    if (this.passwordExpire === false && this.forgotPass === false) {
      if (this.is2FA === 'off') {
        this.closePopup2.nativeElement.click();
      }
    }
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

  cancelOtp() {
    this.display = '';
    clearInterval(this.timeInterval);
    setTimeout(() => {
      // @ts-ignore
      document.getElementById("openModalChangePassword").click();
    }, 500);
    this.toast.error(this.translate.instant('toast.verify.otp'), this.translate.instant('error'), config)
  }

  showModalChangePassword() {
    setTimeout(() => {
      // @ts-ignore
      document.getElementById("openChangePassword").click();
    }, 500)
  }

  count: number = 0;

  removeTimeUpdate() {
    if (this.count == 1) {
      setTimeout(() => {
        // @ts-ignore
        document.getElementById("timeUpdatePassword")?.remove();
      }, 500)
    }
    this.count++;
  }

  // Function handle vietnamese input is not allowed
  removeAccents(str: any, controlName: string) {
    return this.formGroupPassword.get(controlName)?.setValue(this.formGroupPassword.get(controlName)?.value.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd').replace(/Đ/g, 'D'));
  }

  onBlur(event: any) {
    //function validate khong hoat dong -> thuc hien set lai value de thuc hien validate
    if (this.formGroupPassword.value.password === null || this.formGroupPassword.value.password === '') {
      this.formGroupPassword.patchValue({
        password: ''
      })
    }
  }

  handleEmail(): string {
    if (this.email) {
      let data = (this.email as string).split('@');
      let endString = data[1] ? data[1] : 'gmail.com';
      if (data[0].length <= 4) {
        return 'xxx@' + endString;
      }
      return data[0].slice(0, data[0].length - 4) + 'xxx@' + endString;
    }
    return '';
  }

  handlePhone(): string {
    if (this.phone) {
      let phone = this.phone as string;
      return phone.slice(0, phone.length - 3) + 'xxx'
    }
    return '';
  }

  // coutdown time
  display: any;
  isSend_Again: boolean = false;

  timer(minute: number) {
    this.isSend_Again = false
    // let minute = 1;
    let seconds: number = minute * 60;
    let textSec: any = '0';
    let statSec: number = 60;

    const prefix = minute < 10 ? '0' : '';

    this.timeInterval = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        this.isSend_Again = true;
        clearInterval(this.timeInterval);
      }
    }, 1000);
  }

  // warning = '';
  checkWarning: boolean = false;

  ngAfterViewInit(): void {

  }
  isLinkExpire(){
    setTimeout(() => {
      // @ts-ignore
      document.getElementById('closeChangePass').click();
      this.toast.error(this.translate.instant('forgotPassword.expired'), this.translate.instant('error'), config);
      this.route.navigate(["/auth/forgot-password"]);
    }, 700);
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
