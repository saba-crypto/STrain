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

export type UserResponse = ApiResponse<User>;
