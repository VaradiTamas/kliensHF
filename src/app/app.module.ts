import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GalleryComponent } from './gallery/gallery.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { OffersComponent } from './offers/offers.component';
import { VoucherComponent } from './voucher/voucher.component';
import { VoucherReservationComponent } from './voucher/voucher-reservation/voucher-reservation.component';
import { PricesComponent } from './prices/prices.component';
import { QuestionsComponent } from './questions/questions.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ReservationComponent } from './reservation/reservation.component';
import { VoucherManagingComponent } from './reservation/voucher-managing/voucher-managing.component';
import { DatePickerComponent } from './reservation/date-picker/date-picker.component';
import {MaterialModule} from "./material.module";
import {AppRoutingModule} from "./app-routing.module";
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import {HttpClientModule} from "@angular/common/http";
import { BookingsComponent } from './admin/bookings/bookings.component';
import { NavbarComponent } from './admin/navbar/navbar.component';
import { CouponsComponent } from './admin/coupons/coupons.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewBookingComponent } from './admin/bookings/new-booking/new-booking.component';

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
    HeaderComponent,
    GalleryComponent,
    OffersComponent,
    VoucherComponent,
    VoucherReservationComponent,
    PricesComponent,
    QuestionsComponent,
    AboutusComponent,
    ReservationComponent,
    VoucherManagingComponent,
    DatePickerComponent,
    HomeComponent,
    AdminComponent,
    BookingsComponent,
    NavbarComponent,
    CouponsComponent,
    NewBookingComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
