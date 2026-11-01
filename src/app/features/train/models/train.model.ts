import { ApiResponse, PaginatedResponse } from '../../../shared/models/api.model';
export interface Train {
  id: number;
  number: number;
  name: string;
  thumbnail: string;
  coachesCount: number;
  totalSeats: number;
  schedules?: Schedule[];
  coaches?: Coach[];
}

export interface Schedule {
  id: number;
  origin: string;
  destination: string;
  departureTime: string;
  trainId: string;
  trainName: string;
  trainNumber: number;
}

export interface Coach {
  id: number;
  number: number;
  class: string;
  price: number;
  trainId: number;
  seatCount: number;
}

export type TrainsResponse = ApiResponse<PaginatedResponse<Train[]>>;
export type TrainResponse = ApiResponse<Train[]>;
