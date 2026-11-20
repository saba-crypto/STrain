import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoachesResponse } from '../models/coach.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class CoachService {
  private readonly http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;

  getCoaches(trainId: number): Observable<CoachesResponse> {
    return this.http.get<CoachesResponse>(`${this.baseUrl}/coaches/train/${trainId}`);
  }
}
