import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './component/breadcrumb/breadcrumb.component'
import {
  LangChangeEvent,
  TranslateLoader,
  TranslateModule,
  TranslateService,
  TranslateStore,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './component/loader/loader.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { FormatPrice } from './pipe/number.pipe';
import { HasPermissionDirective } from '../core/directive/has-permission.directive';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';

export function sharedCreateTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(
    http, './assets/i18n/shared/', '.json');
}


@NgModule({
  declarations: [
    BreadcrumbComponent,
    LoaderComponent,
    FormatPrice,
    HasPermissionDirective,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NzPaginationModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (sharedCreateTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  exports: [
    BreadcrumbComponent,
    LoaderComponent,
    FormatPrice,
    HasPermissionDirective,
  ],
  providers: [TranslateStore],
})
export class SharedModule {
  constructor(public translationService: TranslateService) {
    this.translationService.store.onLangChange.subscribe(
      (lang: LangChangeEvent) => {
        this.translationService.use(lang.lang);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
