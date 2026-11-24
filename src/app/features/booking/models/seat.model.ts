import { ApiResponse } from '../../../shared/models/api.model';

export interface Seat {
  id: number;
  number: string;
  coachId: number;
  isAvailable?: boolean;
}

export type SeatsResponse = ApiResponse<Seat[]>;
