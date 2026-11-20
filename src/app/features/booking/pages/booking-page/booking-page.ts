import { Component, inject, input, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { CoachService } from '../../services/coach.service';
import { Coach } from '../../models/coach.model';
import { TrainComposition } from '../../components/train-composition/train-composition';

@Component({
  imports: [TrainComposition],
  selector: 'app-booking-page',
  styleUrl: './booking-page.scss',
  templateUrl: './booking-page.html',
})
export class BookingPage {
  private readonly coachService = inject(CoachService);
  public trainId = input.required<number>();
  public scheduleId = input.required<number>();
  public selectedCoach = signal<Coach | null>(null);

  public coachesResource = rxResource({
    stream: () => {
      return this.coachService.getCoaches(this.trainId()).pipe(
        map((res) => {
          return res.data.items;
        }),
      );
    },
  });

  public onCoachSelect(coach: Coach): void {
    this.selectedCoach.set(coach);
  }
}

