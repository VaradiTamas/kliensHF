import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookingService} from "../../services/booking.service";
import {Booking} from "../../model/booking.model";
import {Subscription} from "rxjs";
import {PageEvent} from "@angular/material/paginator";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit, OnDestroy {
  bookings: Booking[] = [];
  isLoading = false;
  totalBookings = 0;
  bookingsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
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
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.bookingsPerPage = pageData.pageSize;
    this.bookingService.getBookings(this.bookingsPerPage, this.currentPage);
  }

  onDelete(bookingId: string){
    this.isLoading = true;
    this.bookingService.deleteBooking(bookingId).subscribe(() => {
      this.bookingService.getBookings(this.bookingsPerPage, this.currentPage);
    })
  }

  ngOnDestroy(): void {
    this.bookinsSubscription.unsubscribe();
  }
}
