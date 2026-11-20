import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core/primitives/di';
import { environment } from '../../../../environments/environments';
import { Observable } from 'rxjs';
import { ScheduleResponse, SchedulesResponse } from '../models/schedule.model';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private readonly http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;

  getSchedules(take: number = 10, page: number = 1): Observable<SchedulesResponse> {
    return this.http.get<SchedulesResponse>(`${this.baseUrl}/schedules`, {
      params: { take, page },
    });
  }

  getScheduleById(scheduleId: number): Observable<ScheduleResponse> {
    return this.http.get<ScheduleResponse>(`${this.baseUrl}/schedules/${scheduleId}`);
  }
}
