import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { Observable, tap } from 'rxjs';
import { UserResponse, UserUpdateInfo, PasswordChangeInfo } from '../models/user.model';
import { AuthService } from '../../../core/services/auth.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);
  private baseUrl = environment.apiBaseUrl;

  public userResource = rxResource({
    stream: () => {
      return this.getUser();
    },
  });

  //methods
  private getUser(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.baseUrl}/users/me`);
  }

  updateUser(updateInfo: UserUpdateInfo) {
    return this.http.put(`${this.baseUrl}/users`, updateInfo).pipe(
      tap(() => {
        this.userResource.reload();
      }),
    );
  }

  updateUserPassword(passwordInfo: PasswordChangeInfo) {
    return this.http.put(`${this.baseUrl}/users/change-password`, passwordInfo);
  }

  deleteUserProfile() {
    return this.http.delete(`${this.baseUrl}/users/delete-profile`).pipe(
      tap(() => {
        this.authService.logout();
      }),
    );
  }
}
