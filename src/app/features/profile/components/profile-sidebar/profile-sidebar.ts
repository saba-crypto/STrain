import { Component, effect, signal } from '@angular/core';
import { inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { ProfileService } from '../../services/profile.service';
import { User } from '../../models/user.model';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-profile-sidebar',
  styleUrl: './profile-sidebar.scss',
  templateUrl: './profile-sidebar.html',
})
export class ProfileSidebar {
  private readonly authService = inject(AuthService);
  private readonly profileService = inject(ProfileService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  logout() {
    this.authService.logout();
    this.toastService.show('Logout Successful', 'success');
    this.router.navigate(['/']);
  }

  public user = signal<User | null>(null);
  constructor() {
    effect(() => {
      const user = this.profileService.userResource.value();
      if (!user) {
        return;
      }
      this.user.set(user.data);
    });
  }
}
