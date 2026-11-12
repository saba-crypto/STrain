import { computed, inject, Injectable, signal } from '@angular/core';
import { LoginCredentials, LoginResponse, RegisterCredentials } from '../models/auth.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { tap, Observable, of, catchError, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;
  private authenticated = signal<boolean>(false);
  public isAuthenticated = this.authenticated.asReadonly();

  register(credentials: RegisterCredentials) {
    return this.http.post(`${this.baseUrl}/auth/register`, credentials);
  }

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, credentials).pipe(
      tap((res) => {
        this.saveTokensToStorage(res.data.accessToken, res.data.refreshToken);
        this.authenticated.set(true);
      }),
    );
  }

  init() {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken && !refreshToken) {
      return of(null);
    }

    return this.http.get(`${this.baseUrl}/users/me`).pipe(
      tap(() => {
        this.authenticated.set(true);
      }),
    );
  }
  refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return of(null);
    }
    return this.http.post<LoginResponse>(
      `${this.baseUrl}/api/auth/refresh-access-token/${refreshToken}`,
      {},
    );
  }

  saveTokensToStorage(accessToken: string, refreshToken: string) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.authenticated.set(false);
  }
}
