import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core/primitives/di';
import { Observable } from 'rxjs';
import { TrainResponse, TrainsResponse } from '../models/train.model';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class TrainService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;

  getTrains(): Observable<TrainsResponse> {
    return this.http.get<TrainsResponse>(`${this.baseUrl}/trains`);
  }

  getTrainById(id: number): Observable<TrainResponse> {
    return this.http.get<TrainResponse>(`${this.baseUrl}/trains/${id}`);
  }
}
