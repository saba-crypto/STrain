import { Routes } from '@angular/router';
import { HomePage } from './features/home/pages/home-page/home-page';
import { TrainsPage } from './features/train/pages/trains-page/trains-page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'trains',
    component: TrainsPage,
  },
];
