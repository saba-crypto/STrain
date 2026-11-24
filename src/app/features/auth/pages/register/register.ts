import { Component, DestroyRef, inject, signal } from '@angular/core';
import { email, form, FormField, minLength, pattern, required } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { LoginBanner } from '../../components/login/login-banner/login-banner';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [RouterLink, LoginBanner, FormField],
  selector: 'app-register',
  styleUrl: './register.scss',
  templateUrl: './register.html',
})
export class Register {
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private registerModel = signal({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  public registerForm = form(this.registerModel, (path) => {
    required(path.firstName, { message: 'First name is required' });
    required(path.lastName, { message: 'Last name is required' });
    required(path.email, { message: 'Email is required' });
    required(path.password, { message: 'Password is required' });

    email(path.email, { message: 'Please Enter A valid email address' });

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
      .register(this.registerModel())
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.isLoading.set(false);
        }),
      )
      .subscribe({
        next: () => {
          this.toastService.show('Please verify your email', 'success');
          this.router.navigate(['/auth/verification/', this.registerModel().email]);
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
