import { ApiResponse, PaginatedResponse } from '../../../shared/models/api.model';

export interface Schedule {
  id: number;
  origin: string;
  destination: string;
  departureTime: string;
  trainId: number;
  trainName: string;
  trainNumber: number;
  trainThumbnail?: string;
}

export type ScheduleResponse = ApiResponse<Schedule>;
export type SchedulesResponse = ApiResponse<PaginatedResponse<Schedule[]>>;
