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
  private mode = 'create';
  private bookingId: string;

  constructor(private bookingService: BookingService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap:ParamMap) => {
      if(paramMap.has('id')) {
        this.mode = 'edit';
        this.bookingId = paramMap.get('id');
        this.booking = this.bookingService.getBooking(this.bookingId);
      }
      else{
        this.mode = 'create';
        this.bookingId = null;
      }
    });
  }

  onSubmit(form : NgForm){
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
      console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
      this.bookingService.updateBooking(formBooking);
    }

    form.reset();
  }

  /*onClear() {
    this.newBookingForm.reset();
  }*/
}
