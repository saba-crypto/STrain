import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { LoginBanner } from '../../components/login/login-banner/login-banner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [FormField, LoginBanner, RouterLink],
  selector: 'app-verification',
  styleUrl: './verification.scss',
  templateUrl: './verification.html',
})
export class Verification {
  public email = input<string>('');

  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private verificationModel = signal({
    code: '',
  });

  public verificationForm = form(this.verificationModel, (path) => {
    required(path.code, { message: 'Verification code is required' });
  });

  public isLoading = signal<boolean>(false);

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.isLoading()) {
      return;
    }
    this.isLoading.set(true);

    this.authService
      .verifyEmail(this.verificationModel().code, this.email())
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.isLoading.set(false);
        }),
      )
      .subscribe({
        next: () => {
          this.toastService.show('Registration was Successful!', 'success');
          this.router.navigate(['/auth/login']);
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
