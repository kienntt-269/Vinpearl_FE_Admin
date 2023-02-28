import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingManagementPageComponent } from './booking-management-page/booking-management-page.component';
import { BookingSettingComponent } from './booking-setting/booking-setting.component';
import { RoomComponent } from './room/room.component';
import { RoomBookingComponent } from './room-booking/room-booking.component';
import { SaveRoomComponent } from './room/save-room/save-room.component';
import { ServiceComponent } from './service/service.component';
import { TypeOfRoomComponent } from './type-of-room/type-of-room.component';
import { FurnitureComponent } from './furniture/furniture.component';
import { SaveTypeOfRoomComponent } from './type-of-room/save-type-of-room/save-type-of-room.component';
import { SaveServiceComponent } from './save-service/save-service.component';

const routes: Routes = [
  {
    path: "",
    component: BookingManagementPageComponent,
  },
  {
    path: "booking-room",
    component: RoomBookingComponent,
  },
  {
    path: "room",
    component: RoomComponent,
  },
  {
    path: "add-room",
    component: SaveRoomComponent,
  },
  {
    path: "update-room",
    component: SaveRoomComponent,
  },
  {
    path: "service",
    component: ServiceComponent,
  },
  {
    path: "save-service",
    component: SaveServiceComponent,
  },
  {
    path: "furniture",
    component: FurnitureComponent,
  },
  {
    path: "type-of-room",
    component: TypeOfRoomComponent,
  },
  {
    path: "add-type-of-room",
    component: SaveTypeOfRoomComponent,
  },
  {
    path: "update-type-of-room",
    component: SaveTypeOfRoomComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomManagementRoutingModule { }
