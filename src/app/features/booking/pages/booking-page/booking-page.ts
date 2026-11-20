import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { TrainService } from '../../../train/services/train.service';
import apc from '@angular/common/locales/extra/apc';
import { map } from 'rxjs';

@Component({
  imports: [],
  selector: 'app-booking-page',
  styleUrl: './booking-page.scss',
  templateUrl: './booking-page.html',
})
export class BookingPage {
  public trainId = input.required<number>();
  public scheduleId = input.required<number>();
}
