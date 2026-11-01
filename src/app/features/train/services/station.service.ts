import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Station, StationsResponse } from '../models/station.model';
@Injectable({
  providedIn: 'root',
})
export class StationService {
  private readonly http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;

  getStations(): Observable<StationsResponse> {
    return this.http.get<StationsResponse>(`${this.baseUrl}/stations`);
  }

  getStationsFromById(id: number): Observable<StationsResponse> {
    return this.http.get<StationsResponse>(`${this.baseUrl}/stations/from/${id}`);
  }

  getStationsToById(id: number): Observable<StationsResponse> {
    return this.http.get<StationsResponse>(`${this.baseUrl}/stations/to/${id}`);
  }
}
