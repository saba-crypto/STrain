import { ApiResponse, PaginatedResponse } from '../../../shared/models/api.model';

interface Schedule {
  id: number;
  origin: string;
  destination: string;
  departureTime: string;
  trainId: number;
  trainName: string;
  trainNumber: number;
}

export type SchedulesResponse = ApiResponse<PaginatedResponse<Schedule[]>>;
