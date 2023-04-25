import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountManagementPageComponent } from './account-management-page/account-management-page.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { PermissionGuard } from 'src/app/core/auth-guard/permission.guard';
const routes: Routes = [
  {
    path: "",
    component: AccountManagementPageComponent,
    canActivate: [PermissionGuard], // Thêm guard vào route
    data: {
      permission: ['WEB_ACCOUNT_MANAGEMENT'] // Quyền cần thiết để truy cập vào trang
    }
  },
  {
    path: "add-account",
    component: AddAccountComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['WEB_ADD_ACCOUNT']
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountManagementRoutingModule { }
