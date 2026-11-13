import { Routes } from '@angular/router';
import { HomePage } from './features/home/pages/home-page/home-page';
import { TrainsPage } from './features/train/pages/trains-page/trains-page';
import { TrainPage } from './features/train/pages/train-page/train-page';
import { Login } from './features/auth/pages/login/login';
import { Register } from './features/auth/pages/register/register';
import { Verification } from './features/auth/pages/verification/verification';
import { ProfilePage } from './features/profile/pages/profile-page/profile-page';
import { ProfileContent } from './features/profile/pages/profile-content/profile-content';
import { SettingsContent } from './features/profile/pages/settings-content/settings-content';
import { BookingsContent } from './features/profile/pages/bookings-content/bookings-content';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'trains',
    component: TrainsPage,
  },
  {
    path: 'trains/:id',
    component: TrainPage,
  },
  {
    path: 'auth/login',
    component: Login,
  },
  {
    path: 'auth/register',
    component: Register,
  },
  {
    path: 'auth/verification/:email',
    component: Verification,
  },
  {
    path: 'profile',
    component: ProfilePage,
    children: [
      {
        path: '',
        component: ProfileContent,
      },
      {
        path: 'bookings',
        component: BookingsContent,
      },
      {
        path: 'settings',
        component: SettingsContent,
      },
    ],
  },
];
