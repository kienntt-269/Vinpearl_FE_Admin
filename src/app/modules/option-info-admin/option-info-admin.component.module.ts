import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Injector, NgModule } from '@angular/core';
import { CommonModule, LOCATION_INITIALIZED } from '@angular/common';
import { OptionInfoAdminComponent } from './option-info-admin.component';
import { LangChangeEvent, TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [
    OptionInfoAdminComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    HttpClientModule,
    NzToolTipModule,
    NzFormModule,
    NzSpaceModule,
    NzCheckboxModule,
    NzButtonModule,
    NzSelectModule,
    NzModalModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (pptionInfoAdminTranslateLoader),
        deps: [HttpClient]
      }
    }),
    HttpClientModule,
  ],
  exports:[
    OptionInfoAdminComponent
  ],
  providers:[
    TranslateStore
  ]
})
export class OptionInfoAdminModule {
  constructor(public translationService: TranslateService) {
    translationService.addLangs(['en', 'vi']);
    // if(!storage.get(constants.LANG)){
    //   storage.save(constants.LANG, initializionConfig.DEFAULT_LANGUAGE)
    // }
	// 	this.translationService.store.onLangChange
    //   .subscribe((lang: LangChangeEvent) => {
    //     this.translationService.use(lang.lang).toPromise();
    //   },error =>{
    //     console.log(error)
    //   });
	}
}
export function pptionInfoAdminTranslateLoader(http: HttpClient) {
  console.log('OptionInfoAdminModule createTranslateLoader');
  return new TranslateHttpLoader(
    http, './assets/i18n/option-admin/', '.json');
}
