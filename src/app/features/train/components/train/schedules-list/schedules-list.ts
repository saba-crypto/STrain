import { Component, input } from '@angular/core';
import { Schedule } from '../../../models/train.model';

@Component({
  imports: [],
  selector: 'app-schedules-list',
  styleUrl: './schedules-list.scss',
  templateUrl: './schedules-list.html',
})
export class SchedulesList {
  public schedules = input<Schedule[] | undefined>([]);
}
