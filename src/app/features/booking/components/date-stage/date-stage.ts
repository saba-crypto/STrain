import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { Coach } from '../../models/coach.model';

@Component({
  selector: 'app-date-stage',
  templateUrl: './date-stage.html',
  styleUrl: './date-stage.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateStage {
  public selectedCoach = input<Coach | null>(null);
  public selectedDate = input<string | null>(null);
  public dateSelect = output<string>();
  public backToCoach = output<void>();

  public dateValue = signal<string>('');

  public today = computed(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  });

  public isDateValid = computed(() => {
    return this.dateValue().trim().length > 0;
  });

  constructor() {
    const initial = this.selectedDate();
    if (initial) {
      this.dateValue.set(initial);
    }
  }

  public onDateChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.dateValue.set(target.value);
  }

  public onContinue(): void {
    if (this.isDateValid()) {
      this.dateSelect.emit(this.dateValue());
    }
  }

  public onBack(): void {
    this.backToCoach.emit();
  }
}
