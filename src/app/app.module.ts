import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/app-header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GalleryComponent } from './gallery/gallery.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { OffersComponent } from './offers/offers.component';
import { VoucherComponent } from './voucher/voucher.component';
import { VoucherReservationComponent } from './voucher/voucher-reservation/voucher-reservation.component';
import { PricesComponent } from './prices/prices.component';
import { QuestionsComponent } from './questions/questions.component';
import { ReservationComponent } from './reservation/reservation.component';
import { VoucherManagingComponent } from './reservation/voucher-managing/voucher-managing.component';
import { DatePickerComponent } from './reservation/date-picker/date-picker.component';
import {MaterialModule} from "./material.module";
import {AppRoutingModule} from "./app-routing.module";
import { HomeComponent } from './home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AuthInterceptor} from "./admin/auth/auth-interceptor";
import {AdminModule} from "./admin/admin.module";
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { ErrorComponent } from './error/error.component';
import {ErrorInterceptor} from "./error/error-interceptor";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    MaterialModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AdminModule
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
    ReservationComponent,
    VoucherManagingComponent,
    DatePickerComponent,
    HomeComponent,
    AppLayoutComponent,
    ErrorComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
