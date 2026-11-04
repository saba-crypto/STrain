import { ApiResponse, PaginatedResponse } from '../../../shared/models/api.model';

export interface Station {
  id: number;
  name: string;
}

export type StationsResponse = ApiResponse<Station[]>;
