import { Component, DestroyRef, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginBanner } from '../../components/login/login-banner/login-banner';
import { email, form, FormField, minLength, pattern, required } from '@angular/forms/signals';
import { AuthService } from '../../../../core/services/auth.service';
import { finalize } from 'rxjs';
import { ToastService } from '../../../../core/services/toast.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [RouterLink, LoginBanner, FormField],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private loginModel = signal({
    email: '',
    password: '',
  });

  public loginForm = form(this.loginModel, (path) => {
    email(path.email, { message: 'Please Enter A valid email address' });
    minLength(path.password, 6, { message: 'Password must contain at least 6 characters' });

    required(path.email, { message: 'Email is required' });
    required(path.password, { message: 'Password is required' });

    minLength(path.password, 6, {
      message: 'Password must be at least 6 characters',
    });
    pattern(path.password, /[a-z]/, {
      message: 'Password must contain at least one lowercase letter',
    });
    pattern(path.password, /\d/, {
      message: 'Password must contain at least one digit',
    });
    pattern(path.password, /[^a-zA-Z0-9]/, {
      message: 'Password must contain at least one special character',
    });
  });

  public isLoading = signal<boolean>(false);

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.isLoading()) {
      return;
    }
    this.isLoading.set(true);

    this.authService
      .login(this.loginModel())
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.isLoading.set(false);
        }),
      )
      .subscribe({
        next: () => {
          this.toastService.show('Login Successful!', 'success');
          this.router.navigate(['/']);
        },
        error: (errorResponse) => {
          this.toastService.show(
            `${errorResponse.error.title}: ${errorResponse.error.detail}`,
            'error',
          );
        },
      });
  }
}
