import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core/primitives/di';
import { environment } from '../../../../environments/environments';
import { Observable } from 'rxjs';
import { SchedulesResponse } from '../models/schedule.model';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private readonly http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;

  getSchedules(): Observable<SchedulesResponse> {
    return this.http.get<SchedulesResponse>(`${this.baseUrl}/schedules`);
  }
}
