import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { Coach } from '../../models/coach.model';
import { Seat } from '../../models/seat.model';

@Component({
  selector: 'app-seats-stage',
  templateUrl: './seats-stage.html',
  styleUrl: './seats-stage.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeatsStage {
  public seats = input<Seat[]>([]);
  public selectedCoach = input<Coach | null>(null);
  public travelDate = input<string | null>(null);
  public isLoading = input<boolean>(false);

  public selectedSeats = signal<Seat[]>([]);

  public seatSelect = output<Seat[]>();
  public backToDate = output<void>();

  public unavailableIds = computed(() => {
    const list = this.seats();
    const set = new Set<number>();
    for (const seat of list) {
      if (seat.isAvailable === false) {
        set.add(seat.id);
      }
    }
    return set;
  });

  public selectedSeatIds = computed(() => {
    return new Set(this.selectedSeats().map((s) => s.id));
  });

  public seatRows = computed(() => {
    const all = this.seats();
    const rows: (Seat | null)[][] = [];
    for (let i = 0; i < all.length; i += 4) {
      const slice: (Seat | null)[] = all.slice(i, i + 4);
      while (slice.length < 4) {
        slice.push(null);
      }
      rows.push(slice);
    }
    return rows;
  });

  public toggleSeat(seat: Seat): void {
    if (this.unavailableIds().has(seat.id)) {
      return;
    }

    const current = this.selectedSeats();
    const exists = current.some((s) => s.id === seat.id);
    if (exists) {
      this.selectedSeats.set(current.filter((s) => s.id !== seat.id));
    } else {
      this.selectedSeats.set([...current, seat]);
    }
  }

  public onReview(): void {
    if (this.selectedSeats().length > 0) {
      this.seatSelect.emit(this.selectedSeats());
    }
  }

  public onBack(): void {
    this.backToDate.emit();
  }
}
