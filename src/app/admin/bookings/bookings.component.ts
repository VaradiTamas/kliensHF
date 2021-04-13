import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookingService} from "../../services/booking.service";
import {Booking} from "../../model/booking.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit, OnDestroy {
  bookings: Booking[] = [];
  isLoading = false;
  private bookinsSubscription: Subscription;

  constructor(public bookingService: BookingService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.bookingService.getBookings();
    this.bookinsSubscription = this.bookingService.getBookingUpdateListener()
      .subscribe((bookings: Booking[]) => {
        this.isLoading = false;
        this.bookings = bookings;
    });
  }

  onDelete(bookingId: string){
    this.bookingService.deleteBooking(bookingId);
  }

  ngOnDestroy(): void {
    this.bookinsSubscription.unsubscribe();
  }
}
