import { Route } from '@angular/router';
import { authGuard, publicGuard } from './core/guards/auth.guard';

export const routes: Route[] = [
  {
    path: '',
    canActivate:[authGuard],
    loadComponent: () =>
      import('./pages/home/home.component').then((mod) => mod.HomeComponent),
  },
  {
    path: 'auth',
    canActivate:[publicGuard],
    children: [
      {
        path: 'sign-up',
        loadComponent: () =>
          import('./pages/auth/sign-up/sign-up.component').then(
            (mod) => mod.SignUpComponent
          ),
      },      {
        path: 'login',
        loadComponent: () =>
          import('./pages/auth/login/login.component').then(
            (mod) => mod.LoginComponent
          ),
      },
    ],
  },
];
