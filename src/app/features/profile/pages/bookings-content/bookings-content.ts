import { Component, inject } from '@angular/core';
import { BookingService } from '../../../booking/services/booking.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { BookingCard } from '../../components/booking-card/booking-card';

@Component({
  imports: [CurrencyPipe, DatePipe, BookingCard],
  selector: 'app-bookings-content',
  styleUrl: './bookings-content.scss',
  templateUrl: './bookings-content.html',
})
export class BookingsContent {
  private readonly bookingService = inject(BookingService);
  public bookingsResource = rxResource({
    stream: () => {
      return this.bookingService.getBookings().pipe(
        map((res) => {
          return res.data;
        }),
      );
    },
  });
}
