import { ApiResponse, PaginatedResponse } from '../../../shared/models/api.model';

export interface Coach {
  id: number;
  number: number;
  class: number;
  price: number;
  trainId: number;
  seatCount: number;
}

export type CoachesResponse = ApiResponse<PaginatedResponse<Coach[]>>;
