import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingsResponse } from '../models/booking.model';
import { environment } from '../../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;

  getBookings(): Observable<BookingsResponse> {
    return this.http.get<BookingsResponse>(`${this.baseUrl}/bookings`);
  }
}
