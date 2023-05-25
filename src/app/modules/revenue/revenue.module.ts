import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevenueComponent } from './revenue.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RevenueRoutingModule } from './revenue-routing.module';
import { LangChangeEvent, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@NgModule({
  declarations: [
    RevenueComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RevenueRoutingModule,
    NzTableModule,
    NzSelectModule,
    NzButtonModule,
    NzDropDownModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (authCreateTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ]
})

export class RevenueModule {
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

export function authCreateTranslateLoader(http: HttpClient) {
  console.log('AuthModule createTranslateLoader');
  return new TranslateHttpLoader(
    http, './assets/i18n/auth/', '.json');
}
