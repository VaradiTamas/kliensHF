import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Voucher} from "../../../model/voucher.model";
import {VoucherService} from "../../../services/voucher.service";
import {Subscription} from "rxjs";
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-new-coupon',
  templateUrl: './new-coupon.component.html',
  styleUrls: ['./new-coupon.component.css']
})
export class NewCouponComponent implements OnInit, OnDestroy {
  authSubscription: Subscription;
  voucher: Voucher;
  isLoading = false;
  private mode = 'create';
  private voucherId: string;

  constructor(private voucherService: VoucherService, public route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {
    this.authSubscription = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
    this.route.paramMap.subscribe((paramMap:ParamMap) => {
      if(paramMap.has('id')) {                    //ha olyan routon erkezunk amiben szerepel az id
        this.mode = 'edit';                             //akkor a mode attributumot edit-re allitjuk
        this.voucherId = paramMap.get('id');
        this.isLoading = true;
        this.voucherService.getVoucher(this.voucherId).subscribe(voucherData => {
          this.isLoading = false;
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
        });
      }
      else{                           //egyebkent pedig create-re
        this.mode = 'create';
        this.voucherId = null;
      }
    });
  }

  onSubmit(form : NgForm){    //ha create modban vagyunk addVoucher, ha pedig edit modban akkor
    if(form.invalid) {        //updateVoucher fuggvenyt hiv a voucherService-n a formba beirt adatokat tovabbitva
      return;
    }
    this.isLoading = true;
    const value = form.value;
    const formVoucher = {
      id: this.voucherId,
      firstName: value.firstName,
      lastName: value.lastName,
      tel: value.tel,
      email: value.email,
      numOfNights: value.numOfNights,
      numOfChildren: value.numOfChildren,
      numOfAdults: value.numOfAdults,
      numOfBedrooms: value.numOfBedrooms,
      country: value.country,
      postcode: value.postcode,
      city: value.city,
      address: value.address,
      isPaid: value.isPaid
    };
    if(this.mode === 'create'){
      this.voucherService.addVoucher(formVoucher);
    }
    else{
      this.voucherService.updateVoucher(formVoucher);
    }
    form.reset();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
