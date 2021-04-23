import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './material.module';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AuthInterceptor} from './auth/auth-interceptor';
import { ErrorComponent } from './error/error.component';
import {ErrorInterceptor} from './error/error-interceptor';
import {AdminComponent} from './admin/admin.component';
import {BookingsComponent} from './admin/bookings/bookings.component';
import {NavbarComponent} from './header/navbar.component';
import {CouponsComponent} from './admin/coupons/coupons.component';
import {NewBookingComponent} from './admin/bookings/new-booking/new-booking.component';
import {NewCouponComponent} from './admin/coupons/new-coupon/new-coupon.component';
import {LoginComponent} from './admin/login/login.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    MaterialModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    ErrorComponent,
    AdminComponent,
    BookingsComponent,
    NavbarComponent,
    CouponsComponent,
    NewBookingComponent,
    NewCouponComponent,
    LoginComponent,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
