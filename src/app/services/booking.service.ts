import {Booking} from "../model/booking.model";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";

@Injectable({providedIn: 'root'})
export class BookingService{
  private bookings: Booking[] = [];
  private bookingsUpdated = new Subject<Booking[]>()

  constructor(private http: HttpClient) {}

  getBookings(){
    this.http.get<Booking[]>('http://localhost:3000/admin/bookings')
      .subscribe((serverBookings)=>{
        this.bookings = serverBookings;
        this.bookingsUpdated.next([...this.bookings]);
      });
  }

  addBooking(booking: Booking){
    this.bookings.push(booking);
    this.bookingsUpdated.next([...this.bookings]);
  }

  getBookingUpdateListener(){
    return this.bookingsUpdated.asObservable();
  }
}
