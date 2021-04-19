export interface Booking{
  id: string;
  voucherId: string;
  firstName: string;
  lastName: string;
  email: string;
  tel: string;
  from: string;
  to: string;
  offerName: string;
  numOfChildren: number;
  numOfAdults: number;
  numOfBedrooms: number;
  comment: string;
  isPaid: boolean;
}
