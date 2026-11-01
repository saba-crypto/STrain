import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core/primitives/di';
import { Observable } from 'rxjs';
import { TrainsResponse, TrainResponse } from '../models/train.model';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class TrainService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;

  getTrains(take: number = 10, page: number = 1): Observable<TrainsResponse> {
    return this.http.get<TrainsResponse>(`${this.baseUrl}/trains?Take=${take}&Page=${page}`);
  }

  getTrainById(id: number): Observable<TrainResponse> {
    return this.http.get<TrainResponse>(`${this.baseUrl}/trains/${id}`);
  }

  getTrainsBySearch(
    query: string,
    take: number = 10,
    page: number = 1,
  ): Observable<TrainsResponse> {
    return this.http.get<TrainsResponse>(
      `${this.baseUrl}/trains/search?query=${query}&Take=${take}&Page=${page}`,
    );
  }

  getTrainsByFilter(
    origin: string,
    destination: string,
    take: number = 10,
    page: number = 1,
  ): Observable<TrainsResponse> {
    return this.http.get<TrainsResponse>(
      `${this.baseUrl}/trains/filter?origin=${origin}&destination=${destination}&take=${take}&page=${page}`,
    );
  }
}
