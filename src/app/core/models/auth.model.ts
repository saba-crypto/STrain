import { ApiResponse } from '../../shared/models/api.model';
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type LoginResponse = ApiResponse<{ accessToken: string; refreshToken: string }>;
