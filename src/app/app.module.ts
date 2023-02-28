import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { vi_VN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormatNumber } from './shared/pipe/number.pipe';
import { MenuItemComponent } from './layout/sidebar/menu-item/menu-item.component';
import { AppInterceptor } from './core/interceptor/app.interceptor';
import { ToastrModule } from 'ngx-toastr';
// import { QuillModule } from 'ngx-quill';

registerLocaleData(vi);

@NgModule({
  declarations: [
    AppComponent,
    ContentLayoutComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    FormatNumber,
    MenuItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    NgbModule,
    // QuillModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: appCreateTranslateLoader,
        deps: [HttpClient],
      },
      isolate: false
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
    { provide: NZ_I18N, useValue: vi_VN },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

export function appCreateTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(
    http, './assets/i18n/auth/', '.json');
}
