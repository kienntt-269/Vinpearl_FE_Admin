import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard} from './core/auth-guard/auth-guard.service';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { PageNotFoundComponent } from './shared/component/page-not-found/page-not-found.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages/revenue',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
          import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'pages',
    component: ContentLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'revenue',
        loadChildren: () =>
          import('./modules/revenue/revenue.module').then((m) => m.RevenueModule),
      },
      {
        path: 'hotel-management',
        loadChildren: () => import('./modules/hotel-management/hotel-management.module').then(m => m.HotelManagementModule)
      },
      {
        path: 'room-management',
        loadChildren: () =>
          import('./modules/room-management/room-management.module').then((m) => m.RoomManagementModule),
      },
      {
        path: 'customer-management',
        loadChildren: () =>
          import('./modules/customer-management/customer-management.module').then((m) => m.CustomerManagementModule),
      },
      {
        path: 'tour-management',
        loadChildren: () =>
          import('./modules/tour-management/tour-management.module').then((m) => m.TourManagementModule),
      },
      {
        path: 'account-management',
        loadChildren: () => import('./modules/account-management/account-management.module').then(m => m.AccountManagementModule)
      },
      {
        path: 'report',
        loadChildren: () => import('./modules/report/report.module').then(m => m.ReportModule)
      },
      {
        path: '500',
        component: PageNotFoundComponent,
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'pages/404',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
