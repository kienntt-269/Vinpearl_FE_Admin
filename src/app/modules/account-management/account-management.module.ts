import { NgModule } from '@angular/core';
import { LangChangeEvent, TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { AccountManagementPageComponent } from './account-management-page/account-management-page.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { AccountManagementRoutingModule } from './account-management-routing.module';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@NgModule({
  declarations: [
    AccountManagementPageComponent,
    AddAccountComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AccountManagementRoutingModule,
    NzTableModule,
    NzSelectModule,
    NzButtonModule,
    NzCheckboxModule,
    NzDropDownModule,
    NzIconModule,
    NzMenuModule,
    NzFormModule,
    NzDatePickerModule,
    NzUploadModule,
    NzInputModule,
    NzTabsModule,
    NzModalModule,
    NzMessageModule,
    ReactiveFormsModule,
    FormsModule,
    NzPaginationModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (accountManagementCreateTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ]
})

export class AccountManagementModule {
  constructor(public translationService: TranslateService) {
    translationService.addLangs(['en', 'vi']);
    if (localStorage.getItem('lang')) {
      translationService.use(localStorage.getItem('lang')!);
    } else {
      localStorage.setItem('lang', 'vi');
      translationService.use('vi');
    }
    // this.translationService.store.onLangChange
    //   .subscribe((lang: LangChangeEvent) => {
    //     this.translationService.use(lang.lang).toPromise();
    //   },error =>{
    //     console.log(error)
    //   });
  }
}

export function accountManagementCreateTranslateLoader(http: HttpClient) {
  console.log('AuthModule createTranslateLoader');
  return new TranslateHttpLoader(
    http, './assets/i18n/account-management/', '.json');
}
