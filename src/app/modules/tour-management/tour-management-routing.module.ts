import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillComponent } from './bill/bill.component';
import { PlaceComponent } from './place/place.component';
import { TourComponent } from './tour/tour.component';
import { TypeOfTourComponent } from './type-of-tour/type-of-tour.component';
import { TourManagementComponent } from './tour-management.component';

const routes: Routes = [
  {
    path: "",
    component: TourManagementComponent,
  },
  {
    path: "bill",
    component: BillComponent,
  },
  {
    path: "place",
    component: PlaceComponent,
  },
  {
    path: "tour",
    component: TourComponent,
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
