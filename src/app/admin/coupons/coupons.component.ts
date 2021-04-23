import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Voucher} from "../../model/voucher.model";
import {VoucherService} from "../../services/voucher.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit, OnDestroy {
  vouchers: Voucher[] = [];
  isLoading = false;
  totalVouchers = 0;
  vouchersPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  serialNum: any;
  private vouchersSubscription: Subscription;

  constructor(public voucherService: VoucherService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.voucherService.getVouchers(this.vouchersPerPage, this.currentPage);
    this.vouchersSubscription = this.voucherService.getVoucherUpdateListener()
      .subscribe((voucherData: {vouchers: Voucher[], voucherCount: number}) => {
        this.isLoading = false;
        this.totalVouchers = voucherData.voucherCount;
        this.vouchers = voucherData.vouchers;
      });
  }

  onChangedPage(pageData: PageEvent){
    this.isLoading = true;        //spinner mutatasa oldalvaltas utan
    this.currentPage = pageData.pageIndex + 1;                //jelenlegi oldalindex beallitasa az alapjan mit valasztottunk ki a UI-n
    this.vouchersPerPage = pageData.pageSize;
    this.voucherService.getVouchers(this.vouchersPerPage, this.currentPage);  //frissiti a vouchereket a beallitasok alapjan
  }

  onDelete(voucherId: string){
    this.isLoading = true;  //spinner mutatatasa torles utan
    this.voucherService.deleteVoucher(voucherId).subscribe(() => {
      this.voucherService.getVouchers(this.vouchersPerPage, this.currentPage);    //voucherek frissitese, hogy a torolt voucher mar ne legyen lathato
    }, () => {
      this.isLoading = false;   //ha hiba tortenne ne a spinner forogjon orokre
    });
  }

  Search(){
    if(this.serialNum == ""){     //ha a keresomezoben nincs semmi akkor valtozatlan minden
      this.ngOnInit();
    }else{
      this.vouchers =this.vouchers.filter(res => {    //ha pedig mar beirtunk valamit csak azokat a vouchereket mutatja amiknek az id-jukre illeszkedik a beirt szoveg
        return res.id.toLocaleLowerCase().match(this.serialNum.toLocaleLowerCase());
      })
    }
  }

  ngOnDestroy(): void {
    this.vouchersSubscription.unsubscribe();
  }
}
