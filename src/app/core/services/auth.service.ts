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

  login(credentials: LoginCredentials, rememberUser: boolean = false): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, credentials).pipe(
      tap((res) => {
        this.saveTokensToStorage(res.data.accessToken, res.data.refreshToken, rememberUser);
        this.authenticated.set(true);
        localStorage.setItem('isRemembered', JSON.stringify(rememberUser));
      }),
    );
  }

  init(): void {
    const accessToken = this.getAccessToken();
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
            const isRemembered = localStorage.getItem('isRemembered') === 'true';
            if (res) {
              this.saveTokensToStorage(res.data.accessToken, res.data.refreshToken, isRemembered);
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
    const refreshToken = this.getRefreshtoken();
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

  saveTokensToStorage(accessToken: string, refreshToken: string, rememberUser: boolean): void {
    if (rememberUser) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    } else {
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('refreshToken', refreshToken);
    }
  }

  logout(): void {
    this.removeAccessToken();
    this.removeRefreshToken();
    localStorage.removeItem('isRemembered');
    this.authenticated.set(false);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
  }

  getRefreshtoken(): string | null {
    return localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken');
  }

  removeAccessToken(): void {
    localStorage.removeItem('accessToken');
    sessionStorage.removeItem('accessToken');
  }

  removeRefreshToken(): void {
    localStorage.removeItem('refreshToken');
    sessionStorage.removeItem('refreshToken');
  }
}
