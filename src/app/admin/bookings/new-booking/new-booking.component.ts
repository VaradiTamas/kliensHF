import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {BookingService} from "../../../services/booking.service";
import {Booking} from "../../../model/booking.model";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.css']
})
export class NewBookingComponent implements OnInit{
  booking: Booking;
  isLoading = false;
  private mode = 'create';
  private bookingId: string;

  constructor(private bookingService: BookingService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap:ParamMap) => {
      if(paramMap.has('id')) {
        this.mode = 'edit';
        this.bookingId = paramMap.get('id');
        this.isLoading = true;
        this.bookingService.getBooking(this.bookingId).subscribe(bookingData => {
          this.isLoading = false;
          this.booking = {
            id: bookingData._id,
            firstName: bookingData.firstName,
            lastName: bookingData.lastName,
            numOfChildren: bookingData.numOfChildren,
            numOfAdults: bookingData.numOfAdults,
            numOfBedrooms: bookingData.numOfBedrooms,
            comment: bookingData.comment,
            isPaid: bookingData.isPaid
          };
        });
      }
      else{
        this.mode = 'create';
        this.bookingId = null;
      }
    });
  }

  onSubmit(form : NgForm){
    if(form.invalid) {
      return;
    }
    this.isLoading = true;
    const value = form.value;
    const formBooking = {
      id: this.bookingId,
      firstName: value.firstName,
      lastName: value.lastName,
      numOfChildren: value.numOfChildren,
      numOfAdults: value.numOfAdults,
      numOfBedrooms: value.numOfBedrooms,
      comment: "hello",
      isPaid: false
    };
    if(this.mode === 'create'){
      this.bookingService.addBooking(formBooking);
    }
    else{
      this.bookingService.updateBooking(formBooking);
    }

    form.reset();
  }

  /*onClear() {
    this.newBookingForm.reset();
  }*/
}
