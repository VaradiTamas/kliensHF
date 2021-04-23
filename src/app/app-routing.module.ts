import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import {AdminComponent} from './admin/admin.component';
import {BookingsComponent} from './admin/bookings/bookings.component';
import {AuthGuard} from './auth/auth.guard';
import {CouponsComponent} from './admin/coupons/coupons.component';
import {NewBookingComponent} from './admin/bookings/new-booking/new-booking.component';
import {NewCouponComponent} from './admin/coupons/new-coupon/new-coupon.component';
import {LoginComponent} from './admin/login/login.component';

const routes: Routes =
  [
    {path: 'admin', component: AdminComponent, children: [
      {path: 'bookings', component: BookingsComponent, canActivate: [AuthGuard]},
      {path: 'vouchers', component: CouponsComponent, canActivate: [AuthGuard]},
      {path: 'bookings/new', component: NewBookingComponent, canActivate: [AuthGuard]},
      {path: 'bookings/edit/:id', component: NewBookingComponent, canActivate: [AuthGuard]},
      {path: 'vouchers/new', component: NewCouponComponent, canActivate: [AuthGuard]},
      {path: 'vouchers/edit/:id', component: NewCouponComponent, canActivate: [AuthGuard]},
      {path: 'login', component: LoginComponent}
    ]},
    {path: '', redirectTo: '/admin', pathMatch: 'full'},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
