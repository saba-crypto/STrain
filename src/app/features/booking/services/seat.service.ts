import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { SeatsResponse } from '../models/seat.model';

@Injectable({
  providedIn: 'root',
})
export class SeatService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;

  getSeatsByCoach(coachId: number): Observable<SeatsResponse> {
    return this.http.get<SeatsResponse>(`${this.baseUrl}/seats/coach/${coachId}`);
  }

  getAvailableSeats(
    scheduleId: number,
    travelDate: string,
    coachId: number,
  ): Observable<SeatsResponse> {
    return this.http.get<SeatsResponse>(`${this.baseUrl}/seats/availability`, {
      params: {
        scheduleId,
        travelDate,
        coachId,
      },
    });
  }
}
