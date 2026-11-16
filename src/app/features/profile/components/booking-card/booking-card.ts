import { Component, input } from '@angular/core';
import { Booking } from '../../../booking/models/booking.model';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  imports: [DatePipe, CurrencyPipe],
  selector: 'app-booking-card',
  styleUrl: './booking-card.scss',
  templateUrl: './booking-card.html',
})
export class BookingCard {
  public booking = input.required<Booking>();
}
