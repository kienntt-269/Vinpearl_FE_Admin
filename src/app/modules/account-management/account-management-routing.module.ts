import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountManagementPageComponent } from './account-management-page/account-management-page.component';
import { AddAccountComponent } from './add-account/add-account.component';
const routes: Routes = [
  {
    path: "",
    component: AccountManagementPageComponent,
  },
  {
    path: "add-account",
    component: AddAccountComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountManagementRoutingModule { }
