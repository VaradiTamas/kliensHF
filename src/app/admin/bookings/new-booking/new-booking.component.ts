import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {BookingService} from "../../../services/booking.service";
import {Booking} from "../../../model/booking.model";

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.css']
})
export class NewBookingComponent implements OnInit{
@ViewChild('f', {static: false})
  newBookingForm: NgForm;

  constructor(private bookingService: BookingService) {}

  ngOnInit() {}

  onSubmit(form : NgForm){
    const value = form.value;
    const newBooking = {
      id: null,
      firstName: value.firstName,
      lastName: value.lastName,
      numOfChildren: value.numOfChildren,
      numOfAdults: value.numOfAdults,
      numOfBedrooms: value.numOfBedrooms,
      comment: "hello",
      isPaid: false
    };
    this.bookingService.addBooking(newBooking);
    form.reset();
  }

  /*onClear() {
    this.newBookingForm.reset();
  }*/
}
