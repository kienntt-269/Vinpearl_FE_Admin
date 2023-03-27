import { NgModule } from '@angular/core';
import { LangChangeEvent, TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
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
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { ReportCustomerHotelComponent } from './report-customer-hotel/report-customer-hotel.component';
import { ReportCustomerTourComponent } from './report-customer-tour/report-customer-tour.component';
import { ReportRoutingModule } from './report-routing.module';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { DatePipe } from '@angular/common';

@NgModule({
    declarations: [
        ReportCustomerHotelComponent,
        ReportCustomerTourComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        NzTableModule,
        NzSelectModule,
        NzButtonModule,
        NzCheckboxModule,
        NzDropDownModule,
        ReportRoutingModule,
        NzIconModule,
        NzMenuModule,
        NzFormModule,
        NzDatePickerModule,
        NzUploadModule,
        NzInputModule,
        NzTabsModule,
        NzModalModule,
        NzMessageModule,
        NzPaginationModule,
        NzAlertModule,
        ReactiveFormsModule,
        FormsModule,
        NzCarouselModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (ReportCreateTranslateLoader),
                deps: [HttpClient]
            },
            isolate: true
        }),
    ],
    providers: [DatePipe],
})

export class ReportModule {
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
    //     this.translationService.use(lang.lang);
    //   },error =>{
    //     console.log(error)
    //   });
  }
}

export function ReportCreateTranslateLoader(http: HttpClient) {
  console.log('ReportModule createTranslateLoader');
  return new TranslateHttpLoader(
    http, './assets/i18n/customer-management/', '.json');
}
