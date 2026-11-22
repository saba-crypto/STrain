import { Component, computed, inject, input, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { RouterLink } from '@angular/router';
import { CoachService } from '../../services/coach.service';
import { ScheduleService } from '../../services/schedule.service';
import { Coach } from '../../models/coach.model';
import { CoachStage } from '../../components/coach-stage/coach-stage';
import { DateStage } from '../../components/date-stage/date-stage';

type BookingProgress = 'coach' | 'date' | 'seats' | 'confirm';

@Component({
  imports: [CoachStage, DateStage, RouterLink],
  selector: 'app-booking-page',
  styleUrl: './booking-page.scss',
  templateUrl: './booking-page.html',
})
export class BookingPage {
  //DI
  private readonly coachService = inject(CoachService);
  private readonly scheduleService = inject(ScheduleService);

  //data
  public bookingProgress = signal<BookingProgress>('coach');
  public trainId = input.required<number>();
  public scheduleId = input.required<number>();
  private selectedCoachId = signal<number | null>(null);
  public travelDate = signal<string | null>(null);
  private selectedSeats = signal<number[]>([]);

  public currentStepNumber = computed(() => {
    switch (this.bookingProgress()) {
      case 'coach':
        return 1;
      case 'date':
        return 2;
      case 'seats':
        return 3;
      case 'confirm':
        return 4;
    }
  });

  //step guards
  private isCoachValid = computed(() => {
    return this.selectedCoachId() !== null;
  });
  private isTravelDateValid = computed(() => {
    return this.travelDate() !== null;
  });
  private isSeatsValid = computed(() => {
    return this.selectedSeats().length > 0;
  });

  //master guard
  canProceed() {
    switch (this.bookingProgress()) {
      case 'coach':
        return this.isCoachValid();
      case 'date':
        return this.isTravelDateValid();
      case 'seats':
        return this.isSeatsValid();
      case 'confirm':
        return true;
    }
  }

  nextStep() {
    if (!this.canProceed()) {
      return;
    }
    switch (this.bookingProgress()) {
      case 'coach':
        this.bookingProgress.set('date');
        break;
      case 'date':
        this.bookingProgress.set('seats');
        break;
      case 'seats':
        this.bookingProgress.set('confirm');
        break;
    }
  }

  public prevStep(): void {
    switch (this.bookingProgress()) {
      case 'date':
        this.bookingProgress.set('coach');
        break;
      case 'seats':
        this.bookingProgress.set('date');
        break;
      case 'confirm':
        this.bookingProgress.set('seats');
        break;
    }
  }

  public scheduleResource = rxResource({
    stream: () => {
      return this.scheduleService.getScheduleById(this.scheduleId()).pipe(
        map((res) => {
          return res.data;
        }),
      );
    },
  });

  public coachesResource = rxResource({
    stream: () => {
      return this.coachService.getCoaches(this.trainId()).pipe(
        map((res) => {
          return res.data.items;
        }),
      );
    },
  });

  public selectedCoach = computed(() => {
    const coachId = this.selectedCoachId();
    const coaches = this.coachesResource.hasValue() ? this.coachesResource.value() : null;
    if (!coachId || !coaches) {
      return null;
    }
    return coaches.find((c) => c.id === coachId) ?? null;
  });

  //methods
  onCoachSelect(coachId: number) {
    this.selectedCoachId.set(coachId);
    this.nextStep();
  }

  onDateSelect(date: string) {
    this.travelDate.set(date);
    this.nextStep();
  }

  formatTime(time: string | undefined): string {
    if (!time) {
      return '';
    }
    return time.substring(0, 5);
  }
}
