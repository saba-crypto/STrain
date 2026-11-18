import { ApiResponse, PaginatedResponse } from '../../../shared/models/api.model';

export interface Booking {
  id: number;
  travelDate: string;
  scheduleId: number;
  origin: string;
  destination: string;
  departureTime: string;
  price: number;
  seatId: number;
  seatNumber: string;
  coachNumber: number;
  coachClass: string;
  trainId: number;
  trainNumber: number;
  trainName: string;
  trainThumbnail: string;
  createdAt: string;
}

export type BookingResponse = ApiResponse<Booking>;
export type BookingsResponse = ApiResponse<PaginatedResponse<Booking[]>>;
