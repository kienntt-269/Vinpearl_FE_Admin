import { NgModule } from '@angular/core';
import { LangChangeEvent, TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TourComponent } from './tour/tour.component';
import { SaveTourComponent } from './save-tour/save-tour.component';
import { TypeOfTourComponent } from './type-of-tour/type-of-tour.component';
import { TourManagementRoutingModule } from './tour-management-routing.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule} from '@angular/common/http';
import { NgxEditorModule } from 'ngx-editor';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@NgModule({
  declarations: [
    TourComponent,
    TypeOfTourComponent,
    SaveTourComponent,
  ],
  imports: [
    TourManagementRoutingModule,
    CommonModule,
    SharedModule,
    NzTableModule,
    NzSelectModule,
    NzButtonModule,
    NzCheckboxModule,
    NzDropDownModule,
    NzIconModule,
    NzMenuModule,
    NzFormModule,
    NzDatePickerModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzTabsModule,
    NzUploadModule,
    NzModalModule,
    NzMessageModule,
    NzCarouselModule,
    NzPaginationModule,
    NgxEditorModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (TourManagementCreateTranslateLoader),
        deps: [HttpClient]
      }
    }),
    HttpClientModule,
    AngularEditorModule
  ]
})
export class TourManagementModule {
  constructor(public translationService: TranslateService) {
    translationService.addLangs(['en', 'vi']);
    // this.translationService.store.onLangChange
    //   .subscribe((lang: LangChangeEvent) => {
    //     this.translationService.use(lang.lang).toPromise();
    //   },error =>{
    //     console.log(error)
    //   });
    if (localStorage.getItem('lang')) {
      translationService.use(localStorage.getItem('lang')!);
    } else {
      localStorage.setItem('lang', 'vi');
      translationService.use('vi');
    }
  }
}

export function TourManagementCreateTranslateLoader(http: HttpClient) {
  console.log('AuthModule createTranslateLoader');
  return new TranslateHttpLoader(
    http, './assets/i18n/tour-management/', '.json');
}
