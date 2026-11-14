import { Component, inject } from '@angular/core';
import { ProfileSidebar } from '../../components/profile-sidebar/profile-sidebar';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  imports: [ProfileSidebar, RouterOutlet],
  selector: 'app-profile-page',
  styleUrl: './profile-page.scss',
  templateUrl: './profile-page.html',
})
export class ProfilePage {
  private readonly authService = inject(AuthService);
  logout() {
    this.authService.logout();
  }
}
