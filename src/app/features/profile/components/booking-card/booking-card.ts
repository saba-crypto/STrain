import { Component, input, output } from '@angular/core';
import { Booking } from '../../../booking/models/booking.model';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  imports: [DatePipe, CurrencyPipe, RouterLink],
  selector: 'app-booking-card',
  styleUrl: './booking-card.scss',
  templateUrl: './booking-card.html',
})
export class BookingCard {
  public booking = input.required<Booking>();
  public onBookingRemove = output<number>();

  public removeBooking(id: number | void) {
    if (!id) {
      return;
    } else {
      return this.onBookingRemove.emit(Number(id));
    }
  }
}
