import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Voucher} from "../../../model/voucher.model";
import {VoucherService} from "../../../services/voucher.service";

@Component({
  selector: 'app-new-coupon',
  templateUrl: './new-coupon.component.html',
  styleUrls: ['./new-coupon.component.css']
})
export class NewCouponComponent implements OnInit {

  voucher: Voucher;
  isLoading = false;
  private mode = 'create';
  private voucherId: string;

  constructor(private voucherService: VoucherService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap:ParamMap) => {
      if(paramMap.has('id')) {
        this.mode = 'edit';
        this.voucherId = paramMap.get('id');
        this.isLoading = true;
        this.voucherService.getVoucher(this.voucherId).subscribe(voucherData => {
          this.isLoading = false;
          this.voucher = {
            id: voucherData._id,
            firstName: voucherData.firstName,
            lastName: voucherData.lastName,
            numOfChildren: voucherData.numOfChildren,
            numOfAdults: voucherData.numOfAdults,
            numOfBedrooms: voucherData.numOfBedrooms,
            isPaid: voucherData.isPaid
          };
        });
      }
      else{
        this.mode = 'create';
        this.voucherId = null;
      }
    });
  }

  onSubmit(form : NgForm){
    if(form.invalid) {
      return;
    }
    this.isLoading = true;
    const value = form.value;
    const formVoucher = {
      id: this.voucherId,
      firstName: value.firstName,
      lastName: value.lastName,
      numOfChildren: value.numOfChildren,
      numOfAdults: value.numOfAdults,
      numOfBedrooms: value.numOfBedrooms,
      isPaid: false
    };
    if(this.mode === 'create'){
      this.voucherService.addVoucher(formVoucher);
    }
    else{
      this.voucherService.updateVoucher(formVoucher);
    }

    form.reset();
  }

}
