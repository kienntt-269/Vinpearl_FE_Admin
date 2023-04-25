import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportCustomerHotelComponent } from './report-customer-hotel/report-customer-hotel.component';
import { ReportCustomerTourComponent } from './report-customer-tour/report-customer-tour.component';
const routes: Routes = [
  {
    path: "customer-hotel",
    component: ReportCustomerHotelComponent,
  },
  {
    path: "customer-tour",
    component: ReportCustomerTourComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
