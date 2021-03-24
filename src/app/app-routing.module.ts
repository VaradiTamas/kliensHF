import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GalleryComponent} from "./gallery/gallery.component";
import {PricesComponent} from "./prices/prices.component";
import {OffersComponent} from "./offers/offers.component";
import {VoucherComponent} from "./voucher/voucher.component";
import {QuestionsComponent} from "./questions/questions.component";
import {AboutusComponent} from "./aboutus/aboutus.component";
import {ReservationComponent} from "./reservation/reservation.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/gallery', pathMatch: 'full' },
  { path: 'gallery', component: GalleryComponent, children: [
      /*{ path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent },*/
    ] },
  { path: 'offers', component: OffersComponent },
  { path: 'voucher', component: VoucherComponent },
  { path: 'prices', component: PricesComponent },
  { path: 'questions', component: QuestionsComponent},
  { path: 'about-us', component: AboutusComponent},
  { path: 'reservation', component: ReservationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
