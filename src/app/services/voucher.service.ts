import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";
import {Voucher} from "../model/voucher.model";

@Injectable({providedIn: 'root'})
export class VoucherService{
  private vouchers: Voucher[] = [];
  private vouchersUpdated = new Subject<Voucher[]>()

  constructor(private http: HttpClient, private router: Router) {}

  getVouchers(){
    this.http.get<{message: string, vouchers: any}>('http://localhost:3000/admin/vouchers')
      .pipe(map((serverVouchers) => {
        return serverVouchers.vouchers.map(voucher => {
          return {
            firstName: voucher.firstName,
            lastName: voucher.lastName,
            tel: voucher.tel,
            email: voucher.email,
            numOfNights: voucher.numOfNights,
            numOfChildren: voucher.numOfChildren,
            numOfAdults: voucher.numOfAdults,
            numOfBedrooms: voucher.numOfBedrooms,
            country: voucher.country,
            postcode: voucher.postcode,
            city: voucher.city,
            address: voucher.address,
            isPaid: voucher.isPaid,
            id: voucher._id,
          };
        });
      }))
      .subscribe((transformedVouchers)=>{
        this.vouchers = transformedVouchers;
        this.vouchersUpdated.next([...this.vouchers]);
      });
  }

  addVoucher(voucher: Voucher){
    this.http.post<{message: string, voucherId: string}>('http://localhost:3000/admin/vouchers', voucher)
      .subscribe((responseData)=>{
        const id = responseData.voucherId;
        voucher.id = id;
        this.vouchers.push(voucher);
        this.vouchersUpdated.next([...this.vouchers]);
        this.router.navigate(["/admin/vouchers"]);
      });
  }

  deleteVoucher(voucherId: string){
    this.http.delete('http://localhost:3000/admin/vouchers/delete/' + voucherId)
      .subscribe(() => {
        const updatedVouchers = this.vouchers.filter(voucher => voucher.id !== voucherId);
        this.vouchers = updatedVouchers;
        this.vouchersUpdated.next([...this.vouchers]);
      });
  }

  updateVoucher(voucher: Voucher){
    this.http.put('http://localhost:3000/admin/vouchers/edit/' + voucher.id, voucher)
      .subscribe((responseData)=>{
        const updatedVouchers = [...this.vouchers];                                     //hogy kliensoldalon is egybol megjelenlen a valtozas
        const oldVoucherIndex = updatedVouchers.findIndex(p => p.id === voucher.id);
        updatedVouchers[oldVoucherIndex] = voucher;
        this.vouchers = updatedVouchers;
        this.vouchersUpdated.next([...this.vouchers]);
        this.router.navigate(["/admin/vouchers"]);
      });
  }

  getVoucher(id: string){
    return this.http.get<{
      _id: string,
      firstName: string,
      lastName: string,
      email: string,
      tel: string,
      numOfChildren: number,
      numOfAdults: number,
      numOfBedrooms: number,
      numOfNights: number,
      country: string,
      postcode: number,
      city: string,
      address: string,
      isPaid: boolean,
    }>('http://localhost:3000/admin/vouchers/' + id);
  }

  getVoucherUpdateListener(){
    return this.vouchersUpdated.asObservable();
  }
}
