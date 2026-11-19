import { Component, inject, input } from '@angular/core';
import { Schedule } from '../../../models/train.model';
import { AuthService } from '../../../../../core/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-schedules-list',
  styleUrl: './schedules-list.scss',
  templateUrl: './schedules-list.html',
})
export class SchedulesList {
  public schedules = input<Schedule[] | undefined>([]);
  public isAuthenticated = inject(AuthService).isAuthenticated();
}
