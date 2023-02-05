import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddHotelComponent } from './add-hotel/add-hotel.component';
import { HotelManagementPageComponent } from './hotel-management-page/hotel-management-page.component';
const routes: Routes = [
  {
    path: "",
    component: HotelManagementPageComponent,
  },
  {
    path: "add-hotel",
    component: AddHotelComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelManagementRoutingModule { }
