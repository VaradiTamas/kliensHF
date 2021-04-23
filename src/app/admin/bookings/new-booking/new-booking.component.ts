import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {BookingService} from "../../../services/booking.service";
import {Booking} from "../../../model/booking.model";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Voucher} from "../../../model/voucher.model";
import {VoucherService} from "../../../services/voucher.service";
import {AuthService} from "../../../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.css']
})
export class NewBookingComponent implements OnInit, OnDestroy{
  booking: Booking;
  voucher: Voucher;
  isLoading = false;
  isVoucherValid = false;
  alreadyCheckedVoucher = false;
  authSubscription: Subscription;
  private mode = 'create';
  private bookingId: string;

  constructor(private bookingService: BookingService,
              private voucherService: VoucherService,
              public route: ActivatedRoute,
              private authService: AuthService){}

  ngOnInit() {
    this.authSubscription = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
    this.route.paramMap.subscribe((paramMap:ParamMap) => {  //ha olyan routon erkezunk amiben szerepel az id
      if(paramMap.has('id')) {                             //akkor a mode attributumot edit-re allitjuk
        this.mode = 'edit';
        this.bookingId = paramMap.get('id');
        this.isLoading = true;
        this.bookingService.getBooking(this.bookingId).subscribe(bookingData => {
          this.isLoading = false;
          this.booking = {
            id: bookingData._id,
            firstName: bookingData.firstName,
            lastName: bookingData.lastName,
            email: bookingData.email,
            tel: bookingData.tel,
            numOfChildren: bookingData.numOfChildren,
            numOfAdults: bookingData.numOfAdults,
            numOfBedrooms: bookingData.numOfBedrooms,
            comment: bookingData.comment,
            isPaid: bookingData.isPaid,
            voucherId: bookingData.voucherId,
            from: bookingData.from,
            to: bookingData.to,
            offerName: bookingData.offerName
          };
        });
      }
      else{     //egyebkent pedig create-re
        this.mode = 'create';
        this.bookingId = null;
      }
    });
  }

  onSubmit(form : NgForm){
    if(form.invalid) {
      return;
    }
    this.isLoading = true;            //spinner mutatasa
    const value = form.value;
    var offerName: string;
    if(value.offerName == null){      //ha nem irunk be csomagnevet akkor az "általános" nevet fogja kapni
      offerName = "általános";
    }else{
      offerName = value.offerName;
    }
    const formBooking = {                     //formra beirt adatok alapjan letrehozott objektum
      id: this.bookingId,
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      tel: value.tel,
      numOfChildren: value.numOfChildren,
      numOfAdults: value.numOfAdults,
      numOfBedrooms: value.numOfBedrooms,
      comment: value.comment,
      isPaid: value.isPaid,
      voucherId: this.voucher?.id,
      from: value.from,
      to: value.to,
      offerName: offerName
    };
    if(this.mode === 'create'){                         //ha letrehozas modban voltunk akkor az addBooking fuggvenyt hivjuk
      this.bookingService.addBooking(formBooking);
    }
    else{                                               //ha pedig modositas modban akkor az updateBookingot
      this.bookingService.updateBooking(formBooking);
    }

    form.reset();
  }

  onCheckVoucher(form : NgForm){    //leellenorzi hogy a beirt koddal letezik e voucher
    const value = form.value;
    this.voucherService.getVoucher(value.voucherId).subscribe(voucherData => {
      this.voucher = {
        id: voucherData._id,
        firstName: voucherData.firstName,
        lastName: voucherData.lastName,
        tel: voucherData.tel,
        email: voucherData.email,
        numOfNights: voucherData.numOfNights,
        numOfChildren: voucherData.numOfChildren,
        numOfAdults: voucherData.numOfAdults,
        numOfBedrooms: voucherData.numOfBedrooms,
        country: voucherData.country,
        postcode: voucherData.postcode,
        city: voucherData.city,
        address: voucherData.address,
        isPaid: voucherData.isPaid
      };
      if(this.voucher.id == value.voucherId){   //ha kaptunk vissza vouchert, tehat van ilyen id-ju
        this.isVoucherValid = true;
      }
      else{
        this.isVoucherValid = false;
      }
      this.alreadyCheckedVoucher = true;      //azert kell mert a mezo mellett addig nem jelenitjuk meg a pipat amig hozza sem nyultunk
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
