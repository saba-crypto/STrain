import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { Coach } from '../../models/coach.model';
import { Seat } from '../../models/seat.model';
import { Schedule } from '../../models/schedule.model';

@Component({
  selector: 'app-confirmation-stage',
  templateUrl: './confirmation-stage.html',
  styleUrl: './confirmation-stage.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationStage {
  public schedule = input<Schedule | null>(null);
  public selectedCoach = input<Coach | null>(null);
  public selectedSeats = input<Seat[]>([]);
  public travelDate = input<string | null>(null);
  public isSubmitting = input<boolean>(false);

  public confirmBooking = output<void>();
  public backToSeats = output<void>();

  public formattedSeats = computed(() => {
    return this.selectedSeats()
      .map((seat) => seat.number)
      .join(', ');
  });

  public totalPrice = computed(() => {
    const coach = this.selectedCoach();
    const count = this.selectedSeats().length;
    if (!coach) {
      return 0;
    }
    return coach.price * count;
  });

  public formatTime(time: string | undefined): string {
    if (!time) {
      return '';
    }
    return time.substring(0, 5);
  }

  public onConfirm(): void {
    if (!this.isSubmitting()) {
      this.confirmBooking.emit();
    }
  }

  public onBack(): void {
    this.backToSeats.emit();
  }
}
