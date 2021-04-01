import {Booking} from "../model/booking.model";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class BookingService{
  private bookings: Booking[] = [];
  private bookingsUpdated = new Subject<Booking[]>()

  constructor(private http: HttpClient) {}

  getBookings(){
    this.http.get<{message: string, bookings: any}>('http://localhost:3000/admin/bookings')
      .pipe(map((serverBookings) => {
        return serverBookings.bookings.map(booking => {
          return {
            firstName: booking.firstName,
            lastName: booking.lastName,
            numOfChildren: booking.numOfChildren,
            numOfAdults: booking.numOfAdults,
            numOfBedrooms: booking.numOfBedrooms,
            comment: booking.comment,
            isPaid: booking.isPaid,
            id: booking._id,
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

  getBookingUpdateListener(){
    return this.bookingsUpdated.asObservable();
  }
}
