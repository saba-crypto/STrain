import { Routes } from '@angular/router';
import { HomePage } from './features/home/pages/home-page/home-page';
import { TrainsPage } from './features/train/pages/trains-page/trains-page';
import { TrainPage } from './features/train/pages/train-page/train-page';
import { Login } from './features/auth/pages/login/login';
import { Register } from './features/auth/pages/register/register';
import { Verification } from './features/auth/pages/verification/verification';

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
];
