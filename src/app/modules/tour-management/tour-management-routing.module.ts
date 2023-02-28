import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TourComponent } from './tour/tour.component';
import { TypeOfTourComponent } from './type-of-tour/type-of-tour.component';
import { TourManagementComponent } from './tour-management.component';
import { SaveTourComponent } from './save-tour/save-tour.component';

const routes: Routes = [
  {
    path: "",
    component: TourManagementComponent,
  },
  {
    path: "tour",
    component: TourComponent,
  },
  {
    path: "save-tour",
    component: SaveTourComponent,
  },
  {
    path: "type-of-tour",
    component: TypeOfTourComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TourManagementRoutingModule { }
