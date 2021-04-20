import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GalleryComponent} from "./gallery/gallery.component";
import {PricesComponent} from "./prices/prices.component";
import {OffersComponent} from "./offers/offers.component";
import {VoucherComponent} from "./voucher/voucher.component";
import {QuestionsComponent} from "./questions/questions.component";
import {AboutusComponent} from "./aboutus/aboutus.component";
import {ReservationComponent} from "./reservation/reservation.component";
import {AdminComponent} from "./admin/admin.component";
import {BookingsComponent} from "./admin/bookings/bookings.component";
import {CouponsComponent} from "./admin/coupons/coupons.component";
import {NewBookingComponent} from "./admin/bookings/new-booking/new-booking.component";
import {NewCouponComponent} from "./admin/coupons/new-coupon/new-coupon.component";
import {LoginComponent} from "./admin/auth/login/login.component";
import {AuthGuard} from "./admin/auth/auth.guard";

const appRoutes: Routes = [
  { path: '', redirectTo: '/gallery', pathMatch: 'full' },
  { path: 'gallery', component: GalleryComponent },
  { path: 'offers', component: OffersComponent },
  { path: 'voucher', component: VoucherComponent },
  { path: 'prices', component: PricesComponent },
  { path: 'questions', component: QuestionsComponent},
  { path: 'about-us', component: AboutusComponent},
  { path: 'reservation', component: ReservationComponent},
  { path: 'admin', component: AdminComponent, children: [
      { path: 'bookings', component: BookingsComponent, canActivate: [AuthGuard] },
      { path: 'vouchers', component: CouponsComponent, canActivate: [AuthGuard] },
      { path: 'bookings/new', component: NewBookingComponent, canActivate: [AuthGuard] },
      { path: 'bookings/edit/:id', component: NewBookingComponent, canActivate: [AuthGuard]},
      { path: 'vouchers/new', component: NewCouponComponent, canActivate: [AuthGuard] },
      { path: 'vouchers/edit/:id', component: NewCouponComponent, canActivate: [AuthGuard]},
      { path: 'login', component: LoginComponent},
      ]},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
