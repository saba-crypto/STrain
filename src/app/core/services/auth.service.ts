import { inject, Injectable, signal } from '@angular/core';
import { LoginCredentials, LoginResponse, RegisterCredentials } from '../models/auth.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { tap, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;
  private authenticated = signal<boolean>(false);
  public isAuthenticated = this.authenticated.asReadonly();
  private authLoading = signal<boolean>(true);
  public isLoading = this.authLoading.asReadonly();

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
    if (!accessToken) {
      this.authLoading.set(false);
      return;
    }

    this.http.get(`${this.baseUrl}/users/me`).subscribe({
      next: () => {
        this.authenticated.set(true);
        this.authLoading.set(false);
      },
      error: () => {
        this.refreshToken().subscribe({
          next: (res) => {
            if (res) {
              this.saveTokensToStorage(res.data.accessToken, res.data.refreshToken);
              this.authenticated.set(true);
            } else {
              this.logout();
            }
            this.authLoading.set(false);
          },
          error: () => {
            this.authenticated.set(false);
            this.authLoading.set(false);
          },
        });
      },
    });
  }
  refreshToken(): Observable<LoginResponse | null> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return of(null);
    }
    return this.http.post<LoginResponse>(
      `${this.baseUrl}/auth/refresh-access-token/${refreshToken}`,
      {},
    );
  }

  verifyEmail(code: string, email: string) {
    return this.http.put(`${this.baseUrl}/auth/verify-email`, { email, code });
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
