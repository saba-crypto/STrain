import { Component, DestroyRef, inject } from '@angular/core';
import { BookingService } from '../../../booking/services/booking.service';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { BookingCard } from '../../components/booking-card/booking-card';
import { BookingEmptyState } from '../../components/booking-empty-state/booking-empty-state';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  imports: [BookingCard, BookingEmptyState],
  selector: 'app-bookings-content',
  styleUrl: './bookings-content.scss',
  templateUrl: './bookings-content.html',
})
export class BookingsContent {
  private readonly bookingService = inject(BookingService);
  private toastService = inject(ToastService);
  private destroyRef = inject(DestroyRef);
  public bookingsResource = rxResource({
    stream: () => {
      return this.bookingService.getBookings().pipe(
        map((res) => {
          return res.data;
        }),
      );
    },
  });

  public removeBooking(id: number) {
    this.bookingService
      .removeBooking(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.toastService.show('Booking was removed successfully!', 'success');
          this.bookingsResource.reload();
        },
        error: () => {
          this.toastService.show('Failed to Remove Booking, please try again later', 'error');
        },
      });
  }
}
