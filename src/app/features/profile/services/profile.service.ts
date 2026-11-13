import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { Observable } from 'rxjs';
import { UserResponse, UserUpdateInfo, PasswordChangeInfo } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;

  //methods
  getUser(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.baseUrl}/users/me`);
  }

  updateUser(updateInfo: UserUpdateInfo) {
    return this.http.put(`${this.baseUrl}/users`, updateInfo);
  }

  updateUserPassword(passwordInfo: PasswordChangeInfo) {
    return this.http.put(`${this.baseUrl}/users/change-password`, passwordInfo);
  }

  deleteUserProfile() {
    return this.http.delete(`${this.baseUrl}/users/delete-profile`);
  }
}
