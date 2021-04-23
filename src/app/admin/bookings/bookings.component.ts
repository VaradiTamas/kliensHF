import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookingService} from "../../services/booking.service";
import {Booking} from "../../model/booking.model";
import {Subscription} from "rxjs";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit, OnDestroy {
  bookings: Booking[] = [];
  isLoading = false;
  totalBookings = 0;
  bookingsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [2, 5, 10];
  private bookinsSubscription: Subscription;

  constructor(public bookingService: BookingService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.bookingService.getBookings(this.bookingsPerPage, this.currentPage);
    this.bookinsSubscription = this.bookingService.getBookingUpdateListener()
      .subscribe((bookingData: {bookings: Booking[], bookingCount: number}) => {
        this.isLoading = false;
        this.totalBookings = bookingData.bookingCount;
        this.bookings = bookingData.bookings;
    });
  }

  onChangedPage(pageData: PageEvent){
    this.isLoading = true;                                                    //spinner mutatasa
    this.currentPage = pageData.pageIndex + 1;                                //jelenlegi index beallitasa az alapjan mit valasztottunk ki
    this.bookingsPerPage = pageData.pageSize;                                 //-||-
    this.bookingService.getBookings(this.bookingsPerPage, this.currentPage);  //csak az oldalbeallitasoknak megfelelo bookingok frissitese
  }

  onDelete(bookingId: string){
    this.isLoading = true;    //spinner mutatasa
    this.bookingService.deleteBooking(bookingId).subscribe(() => {
      this.bookingService.getBookings(this.bookingsPerPage, this.currentPage);  //bookingok frissitese (deleted elem nelkul)
    }, () => {
      this.isLoading = false;   //ha hiba tortenne a spinner elrejtese es az adatok mutatasa
    })
  }

  ngOnDestroy(): void {
    this.bookinsSubscription.unsubscribe();
  }
}
