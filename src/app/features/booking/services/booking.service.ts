import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingResponse, BookingsResponse } from '../models/booking.model';
import { environment } from '../../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;

  getBookings(): Observable<BookingsResponse> {
    return this.http.get<BookingsResponse>(`${this.baseUrl}/bookings`);
  }

  getBookingById(id: number): Observable<BookingResponse> {
    return this.http.get<BookingResponse>(`${this.baseUrl}/bookings/${id}`);
  }

  removeBooking(id: number) {
    return this.http.delete(`${this.baseUrl}/bookings/${id}`);
  }
}
