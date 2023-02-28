import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelManagementPageComponent } from './hotel-management-page/hotel-management-page.component';
import { SaveHotelComponent } from './save-hotel/save-hotel.component';
const routes: Routes = [
  {
    path: "",
    component: HotelManagementPageComponent,
  },
  {
    path: "save-hotel",
    component: SaveHotelComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelManagementRoutingModule { }
