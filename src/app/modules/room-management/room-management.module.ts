import { NgModule } from '@angular/core';
import { LangChangeEvent, TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { BookingManagementPageComponent } from './booking-management-page/booking-management-page.component';
import { RoomManagementRoutingModule } from './room-management-routing.module';
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
import { BookingSettingComponent } from './booking-setting/booking-setting.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoomBookingComponent } from './room-booking/room-booking.component';
import { RoomComponent } from './room/room.component';
import { SaveRoomComponent } from './room/save-room/save-room.component';
import { ServiceComponent } from './service/service.component';
import { FurnitureComponent } from './furniture/furniture.component';
import { TypeOfRoomComponent } from './type-of-room/type-of-room.component';
import { SaveTypeOfRoomComponent } from './type-of-room/save-type-of-room/save-type-of-room.component';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { SaveServiceComponent } from './save-service/save-service.component';

@NgModule({
  declarations: [
    BookingManagementPageComponent,
    BookingSettingComponent,
    RoomBookingComponent,
    RoomComponent,
    SaveRoomComponent,
    ServiceComponent,
    FurnitureComponent,
    TypeOfRoomComponent,
    SaveTypeOfRoomComponent,
    SaveServiceComponent
  ],
  imports: [
    RoomManagementRoutingModule,
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
    NzInputNumberModule,
    NzDatePickerModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzTabsModule,
    NzUploadModule,
    NzModalModule,
    NzMessageModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (roomManagementCreateTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ]
})
export class RoomManagementModule {
  constructor(public translationService: TranslateService) {
    translationService.addLangs(['en', 'vi']);
    this.translationService.store.onLangChange
      .subscribe((lang: LangChangeEvent) => {
        this.translationService.use(lang.lang).toPromise();
      },error =>{
        console.log(error)
      });
  }
}

export function roomManagementCreateTranslateLoader(http: HttpClient) {
  console.log('RoomManagementModule createTranslateLoader');
  return new TranslateHttpLoader(
    http, './assets/i18n/room-management/', '.json');
}
