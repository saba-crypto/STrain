import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { BookingService } from '../../../booking/services/booking.service';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { BookingCard } from '../../components/booking-card/booking-card';
import { BookingEmptyState } from '../../components/booking-empty-state/booking-empty-state';
import { ToastService } from '../../../../core/services/toast.service';

interface BookingsFilterState {
  from: string;
  to: string;
}

@Component({
  imports: [BookingCard, BookingEmptyState],
  selector: 'app-bookings-content',
  styleUrl: './bookings-content.scss',
  templateUrl: './bookings-content.html',
})
export class BookingsContent {
  //DI
  private readonly bookingService = inject(BookingService);
  private toastService = inject(ToastService);
  private destroyRef = inject(DestroyRef);

  //states
  public bookingsFilterState = signal<BookingsFilterState | null>(null);
  public minDate = signal<string>(new Date().toISOString().split('T')[0]);

  //data
  public bookingsResource = rxResource({
    params: () => this.bookingsFilterState(),
    stream: () => {
      if (this.bookingsFilterState()) {
        return this.bookingService
          .getBookingsByFilter(this.bookingsFilterState()!.from, this.bookingsFilterState()!.to)
          .pipe(
            map((res) => {
              return res.data;
            }),
          );
      }
      return this.bookingService.getBookings().pipe(
        map((res) => {
          return res.data;
        }),
      );
    },
  });

  //methods
  public removeBooking(id: number) {
    this.bookingService
      .removeBooking(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.toastService.show('Booking was removed successfully!', 'success');
          this.bookingsResource.reload();
        },
        error: (errorResponse) => {
          this.toastService.show(
            `${errorResponse.error.title}: ${errorResponse.error.detail}`,
            'error',
          );
        },
      });
  }

  public updateBookingsFilterState(from: string, to: string): void {
    if (!from && !to) {
      return;
    }

    if (from && to && from >= to) {
      this.toastService.show('From date must be earlier than To date', 'error');
      return;
    }

    const currentFilter = this.bookingsFilterState();
    if (currentFilter?.from === from && currentFilter?.to === to) {
      return;
    }

    this.bookingsFilterState.set({ from, to });
  }

  public clearBookingsFilterState(
    fromDateInput?: HTMLInputElement,
    toDateInput?: HTMLInputElement,
  ): void {
    if (fromDateInput) {
      fromDateInput.value = '';
    }
    if (toDateInput) {
      toDateInput.value = '';
    }

    if (this.bookingsFilterState()) {
      this.bookingsFilterState.set(null);
    }
  }
}
