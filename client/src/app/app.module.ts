import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './shared/layouts/admin-layout/admin-layout.component';
import { ClientLayoutComponent } from './shared/layouts/client-layout/client-layout.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './shared/classes/token.interceptor';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { RegionsPageComponent } from './regions-page/regions-page.component';
import { HolidaysPageComponent } from './holidays-page/holidays-page.component';
import { AdministratorsPageComponent } from './administrators-page/administrators-page.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { RegionsFormComponent } from './regions-page/regions-form/regions-form.component';
import { VprsComponentComponent } from './vprs-component/vprs-component.component';
import { VprsRegionsPageComponent } from './vprs-component/vprs-regions-page/vprs-regions-page.component';
import { VprsFormComponent } from './vprs-component/vprs-regions-page/vprs-form/vprs-form.component';
import { VprsPageComponent } from './vprs-component/vprs-regions-page/vprs-page/vprs-page.component';
import { DashboardVprListComponent } from './dashboard-page/dashboard-vpr-list/dashboard-vpr-list.component';
import { DashboardOrdersPageComponent } from './dashboard-page/dashboard-orders-page/dashboard-orders-page.component';
import { HolidaysFormComponent } from './holidays-page/holidays-form/holidays-form.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { TimeSelectPageComponent } from './order-page/time-select-page/time-select-page.component';
import { SingleOrderPageComponent } from './order-page/single-order-page/single-order-page.component';
import { RegionMapComponent } from './order-page/region-map/region-map.component';
import { DocumentsListPageComponent } from './order-page/documents-list-page/documents-list-page.component';
import { OrderFormComponent } from './order-page/order-form/order-form.component';
import { TimePeriodPipe } from './shared/pipes/time-period.pipe';



@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    AdminLayoutComponent,
    ClientLayoutComponent,
    RegisterPageComponent,
    DashboardPageComponent,
    RegionsPageComponent,
    HolidaysPageComponent,
    AdministratorsPageComponent,
    LoaderComponent,
    RegionsFormComponent,
    VprsComponentComponent,
    VprsRegionsPageComponent,
    VprsFormComponent,
    VprsPageComponent,
    DashboardVprListComponent,
    DashboardOrdersPageComponent,
    HolidaysFormComponent,
    OrderPageComponent,
    TimeSelectPageComponent,
    SingleOrderPageComponent,
    RegionMapComponent,
    DocumentsListPageComponent,
    OrderFormComponent,
    TimePeriodPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: TokenInterceptor
  }],
  bootstrap: [AppComponent]
})

export class AppModule { 
  // registerLocaleData(localeFr, 'fr')
}

