import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Voucher} from "../../model/voucher.model";
import {VoucherService} from "../../services/voucher.service";

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit, OnDestroy {
  vouchers: Voucher[] = [];
  isLoading = false;
  private vouchersSubscription: Subscription;

  constructor(public voucherService: VoucherService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.voucherService.getVouchers();
    this.vouchersSubscription = this.voucherService.getVoucherUpdateListener()
      .subscribe((vouchers: Voucher[]) => {
        this.isLoading = false;
        this.vouchers = vouchers;
      });
  }

  onDelete(voucherId: string){
    this.voucherService.deleteVoucher(voucherId);
  }

  ngOnDestroy(): void {
    this.vouchersSubscription.unsubscribe();
  }
}
