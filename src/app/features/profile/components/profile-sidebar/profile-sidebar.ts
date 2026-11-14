import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-profile-sidebar',
  styleUrl: './profile-sidebar.scss',
  templateUrl: './profile-sidebar.html',
})
export class ProfileSidebar {
  private readonly authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  logout() {
    this.authService.logout();
    this.toastService.show('Logout Successful', 'success');
    this.router.navigate(['/']);
  }
}
