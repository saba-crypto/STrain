import { Component, DestroyRef, inject } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { ToastService } from '../../../../core/services/toast.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-settings-content',
  styleUrl: './settings-content.scss',
  templateUrl: './settings-content.html',
})
export class SettingsContent {
  private readonly profileService = inject(ProfileService);
  private toastService = inject(ToastService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

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
