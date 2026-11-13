import { ApiResponse } from '../../../shared/models/api.model';

export interface User {
  id: 0;
  email: string;
  lastName: string;
  firstName: string;
  details: {
    phoneNumber: string;
    address: string;
    dob: string;
    pictureUrl: string;
  };
}

export interface UserUpdateInfo {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  pictureUrl: string;
  dateOfBirth: string;
}

export interface PasswordChangeInfo {
  currentPassword: string;
  newPassword: string;
}

export type UserResponse = ApiResponse<User>;
