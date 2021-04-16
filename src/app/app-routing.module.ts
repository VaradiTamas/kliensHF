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
      { path: 'bookings', component: BookingsComponent },
      { path: 'vouchers', component: CouponsComponent },
      { path: 'bookings/new', component: NewBookingComponent },
      { path: 'bookings/edit/:id', component: NewBookingComponent},
      { path: 'vouchers/new', component: NewCouponComponent },
      { path: 'vouchers/edit/:id', component: NewCouponComponent}
      ]},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
