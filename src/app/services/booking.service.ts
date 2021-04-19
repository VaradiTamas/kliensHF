import {Booking} from "../model/booking.model";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class BookingService{
  private bookings: Booking[] = [];
  private bookingsUpdated = new Subject<Booking[]>()

  constructor(private http: HttpClient, private router: Router) {}

  getBookings(){
    this.http.get<{message: string, bookings: any}>('http://localhost:3000/admin/bookings')
      .pipe(map((serverBookings) => {
        return serverBookings.bookings.map(booking => {
          return {
            firstName: booking.firstName,
            lastName: booking.lastName,
            email: booking.email,
            tel: booking.tel,
            numOfChildren: booking.numOfChildren,
            numOfAdults: booking.numOfAdults,
            numOfBedrooms: booking.numOfBedrooms,
            comment: booking.comment,
            isPaid: booking.isPaid,
            id: booking._id,
            voucherId: booking.voucherId,
            from: booking.from,
            to: booking.to,
            offerName: booking.offerName
          };
        });
      }))
      .subscribe((transformedBookings)=>{
        this.bookings = transformedBookings;
        this.bookingsUpdated.next([...this.bookings]);
      });
  }

  addBooking(booking: Booking){
    this.http.post<{message: string, bookingId: string}>('http://localhost:3000/admin/bookings', booking)
      .subscribe((responseData)=>{
        const id = responseData.bookingId;
        booking.id = id;
        this.bookings.push(booking);
        this.bookingsUpdated.next([...this.bookings]);
        this.router.navigate(["/admin/bookings"]);
      });
  }

  deleteBooking(bookingId: string){
    this.http.delete('http://localhost:3000/admin/bookings/delete/' + bookingId)
      .subscribe(() => {
        const updatedBookings = this.bookings.filter(booking => booking.id !== bookingId);
        this.bookings = updatedBookings;
        this.bookingsUpdated.next([...this.bookings]);
      });
  }

  updateBooking(booking: Booking){
    this.http.put('http://localhost:3000/admin/bookings/edit/' + booking.id, booking)
      .subscribe((responseData)=>{
        const updatedBookings = [...this.bookings];                                     //hogy kliensoldalon is egybol megjelenlen a valtozas
        const oldBookingIndex = updatedBookings.findIndex(p => p.id === booking.id);
        updatedBookings[oldBookingIndex] = booking;
        this.bookings = updatedBookings;
        this.bookingsUpdated.next([...this.bookings]);
        this.router.navigate(["/admin/bookings"]);
      });
  }

  getBooking(id: string){
    return this.http.get<{
      _id: string,
      voucherId: string,
      firstName: string,
      lastName: string,
      email: string,
      tel: string,
      from: string,
      to: string,
      offerName: string,
      numOfChildren: number,
      numOfAdults: number,
      numOfBedrooms: number,
      comment: string,
      isPaid: boolean
    }>('http://localhost:3000/admin/bookings/' + id);
  }

  getBookingUpdateListener(){
    return this.bookingsUpdated.asObservable();
  }
}
