import { Component } from '@angular/core';
import { ProfileSidebar } from '../../components/profile-sidebar/profile-sidebar';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [ProfileSidebar, RouterOutlet],
  selector: 'app-profile-page',
  styleUrl: './profile-page.scss',
  templateUrl: './profile-page.html',
})
export class ProfilePage {}
