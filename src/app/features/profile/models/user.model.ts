import { ApiResponse } from '../../../shared/models/api.model';

export interface User {
  id: 0;
  email: string;
  lastName: string;
  firstName: string;
  details: {
    phoneNumber: string;
    address: string;
    dob: Date;
    pictureUrl: string;
  };
}

export interface UserUpdateInfo {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phoneNumber: string | null;
  address: string | null;
  pictureUrl: string | null;
  dateOfBirth: Date | null;
}

export interface PasswordChangeInfo {
  currentPassword: string;
  newPassword: string;
}

export type UserResponse = ApiResponse<User>;
