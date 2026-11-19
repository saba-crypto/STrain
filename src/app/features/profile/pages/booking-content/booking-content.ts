import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BookingService } from '../../../booking/services/booking.service';
import { map } from 'rxjs';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  imports: [CurrencyPipe, DatePipe, RouterLink],
  selector: 'app-booking-content',
  styleUrl: './booking-content.scss',
  templateUrl: './booking-content.html',
})
export class BookingContent {
  //DI
  private readonly bookingService = inject(BookingService);
  private readonly router = inject(Router);
  private toastService = inject(ToastService);
  private destroyRef = inject(DestroyRef);

  //states
  public isChangingDate = signal<boolean>(false);
  public minDate = signal<string>(new Date().toISOString().split('T')[0]);

  //data
  id = input.required<number, string | number>({
    transform: (value) => {
      return Number(value);
    },
  });

  public bookingResource = rxResource({
    stream: () => {
      return this.bookingService.getBookingById(this.id()).pipe(
        map((res) => {
          return res.data;
        }),
      );
    },
  });

  //methods
  removeBooking(): void {
    this.bookingService
      .removeBooking(this.id())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.toastService.show('Booking was deleted successfully!', 'success');
          this.router.navigate(['/profile/bookings']);
        },
        error: () => {
          this.toastService.show('Failed to delete booking, try again later bro', 'error');
        },
      });
  }

  changeTravelDate(travelDate: string): void {
    this.bookingService
      .changeBookingTravelDate(this.id(), travelDate)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.toastService.show('Date was changed successfully', 'success');
          this.isChangingDate.set(false);
          this.bookingResource.reload();
        },
        error: (errorResponse) => {
          this.toastService.show(
            `${errorResponse.error.title}: ${errorResponse.error.detail}`,
            'error',
          );
        },
      });
  }

  formatTime(time: string): string {
    return time.slice(0, 5);
  }
}
