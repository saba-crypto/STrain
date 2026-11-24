import { ApiResponse } from '../../../shared/models/api.model';

interface Seat {
  id: number;
  number: string;
  coachId: number;
  isAvailable?: boolean;
}

export type SeatsResponse = ApiResponse<Seat[]>;
