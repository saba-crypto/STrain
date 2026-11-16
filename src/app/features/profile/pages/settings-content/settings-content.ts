import { Component, DestroyRef, inject, signal } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { ToastService } from '../../../../core/services/toast.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { form, FormField, minLength, pattern, required, validate } from '@angular/forms/signals';
import { finalize } from 'rxjs';
interface PasswordChangeModel {
  currentPassword: string;
  newPassword: string;
}

@Component({
  imports: [FormField],
  selector: 'app-settings-content',
  styleUrl: './settings-content.scss',
  templateUrl: './settings-content.html',
})
export class SettingsContent {
  private readonly profileService = inject(ProfileService);
  private toastService = inject(ToastService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  passwordModel = signal<PasswordChangeModel>({
    currentPassword: '',
    newPassword: '',
  });

  public passwordForm = form(this.passwordModel, (path) => {
    required(path.currentPassword, { message: 'Current password is required' });
    required(path.newPassword, { message: 'New password is required' });

    minLength(path.newPassword, 8, {
      message: 'Password must be at least 8 characters',
    });
    pattern(path.newPassword, /[a-z]/, {
      message: 'Password must contain at least one lowercase letter',
    });
    pattern(path.newPassword, /\d/, {
      message: 'Password must contain at least one digit',
    });
    pattern(path.newPassword, /[^a-zA-Z0-9]/, {
      message: 'Password must contain at least one special character',
    });

    validate(path.newPassword, ({ value }) => {
      if (value() && value() === this.passwordModel().currentPassword) {
        return { kind: 'password match', message: 'Passwords cannot be same' };
      }
      return null;
    });
  });

  public isLoading = signal<boolean>(false);
  onSubmit(event: Event) {
    event.preventDefault();

    if (this.isLoading() || this.passwordForm().invalid()) {
      return;
    }

    this.isLoading.set(true);

    this.profileService
      .updateUserPassword(this.passwordModel())
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.isLoading.set(false);
        }),
      )
      .subscribe({
        next: () => {
          this.toastService.show('Password was changed successfully!', 'success');
          this.passwordForm().reset({
            currentPassword: '',
            newPassword: '',
          });
        },
        error: (errorResponse) => {
          this.toastService.show(
            `${errorResponse.error.title}: ${errorResponse.error.detail}`,
            'error',
          );
        },
      });
  }

  deleteAccount() {
    this.profileService
      .deleteUserProfile() //manages isAuthenticated state as well
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.toastService.show('Account was Deleted Successfully', 'success');
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
