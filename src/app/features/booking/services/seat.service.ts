import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core/primitives/di';
import { Observable } from 'rxjs';
import { SeatsResponse } from '../models/seat.model';

@Injectable({
  providedIn: 'root',
})
export class SeatService {
  private readonly http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;

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
