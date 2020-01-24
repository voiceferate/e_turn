import { OrderFormComponent } from './order-page/order-form/order-form.component';
import { SingleOrderPageComponent } from './order-page/single-order-page/single-order-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './shared/layouts/admin-layout/admin-layout.component';
import { ClientLayoutComponent } from './shared/layouts/client-layout/client-layout.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthGuard } from './shared/classes/auth.guard';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { RegionsPageComponent } from './regions-page/regions-page.component';
import { HolidaysPageComponent } from './holidays-page/holidays-page.component';
import { AdministratorsPageComponent } from './administrators-page/administrators-page.component';
import { RegionsFormComponent } from './regions-page/regions-form/regions-form.component';
import { VprsPageComponent } from './vprs-component/vprs-regions-page/vprs-page/vprs-page.component';
import { VprsFormComponent } from './vprs-component/vprs-regions-page/vprs-form/vprs-form.component';
import { VprsComponentComponent } from './vprs-component/vprs-component.component';
import { DashboardOrdersPageComponent } from './dashboard-page/dashboard-orders-page/dashboard-orders-page.component';
import { HolidaysFormComponent } from './holidays-page/holidays-form/holidays-form.component';
import { OrderPageComponent } from './order-page/order-page.component';

const routes: Routes = [
  {
    path: '', component: ClientLayoutComponent, children: [
      {path: 'order', component: OrderPageComponent},
      {path: 'order/client', component: OrderFormComponent},
      {path: 'order/:id', component: SingleOrderPageComponent},
      {path: '', redirectTo: 'order', pathMatch: 'full'}
    ]
  },
  {
    path: '', component: AuthLayoutComponent, children: [
      {path: 'login', component: LoginPageComponent},
      {path: 'register', component: RegisterPageComponent},
    ]
  },
  {
    path: '', component: AdminLayoutComponent, canActivate: [AuthGuard], children: [
      {path: 'dashboard', component: DashboardPageComponent},
      {path: 'dashboard/:vprId', component: DashboardOrdersPageComponent},

      {path: 'regions', component: RegionsPageComponent},
      {path: 'regions/new', component: RegionsFormComponent},
      {path: 'regions/:id', component: RegionsFormComponent},

      {path: 'vprs-regions', component: VprsComponentComponent},
      {path: 'vprs-regions/:regionId/vprs', component: VprsPageComponent},
      {path: 'vprs-regions/:regionId/vprs/new', component: VprsFormComponent},
      {path: 'vprs-regions/:regionId/vprs/:vprId', component: VprsFormComponent},

      {path: 'holidays', component: HolidaysPageComponent},
      {path: 'holidays/new', component: HolidaysFormComponent},
      {path: 'holidays/:id', component: HolidaysFormComponent},


      {path: 'administrators', component: AdministratorsPageComponent},
    ]
  },

]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {

}