import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './features/auth/services/auth.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./features/auth/pages/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/pages/home/home.component').then(m => m.HomeComponent),
    canActivate: [
      () => {
        const auth = inject(AuthService);
        const router = inject(Router);
        if (!auth.isLoggedIn()) {
          router.navigate(['/login']);
          return false;
        }
        return true;
      }
    ]
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./features/profile/pages/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [
      () => {
        const auth = inject(AuthService);
        const router = inject(Router);
        if (!auth.isLoggedIn()) {
          router.navigate(['/login']);
          return false;
        }
        return true;
      }
    ]
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./features/talents/pages/search/search.component').then(m => m.SearchComponent),
    canActivate: [
      () => {
        const auth = inject(AuthService);
        const router = inject(Router);
        if (!auth.isLoggedIn()) {
          router.navigate(['/login']);
          return false;
        }
        return true;
      }
    ]
  },
  {
    path: 'map',
    loadComponent: () =>
      import('./features/talents/pages/map-view/map-view.component').then(m => m.MapViewComponent),
    canActivate: [
      () => {
        const auth = inject(AuthService);
        const router = inject(Router);
        if (!auth.isLoggedIn()) {
          router.navigate(['/login']);
          return false;
        }
        return true;
      }
    ]
  },
  {
    path: 'collaboration',
    loadComponent: () =>
      import('./features/collaboration/pages/find-collaborator/find-collaborator.component').then(m => m.FindCollaboratorComponent),
    canActivate: [
      () => {
        const auth = inject(AuthService);
        const router = inject(Router);
        if (!auth.isLoggedIn()) {
          router.navigate(['/login']);
          return false;
        }
        return true;
      }
    ]
  },
  {
    path: 'admin/badges',
    loadComponent: () =>
      import('./features/badge/pages/admin-badges/admin-badges.component').then(m => m.AdminBadgesComponent),
    canActivate: [
      () => {
        const auth = inject(AuthService);
        const router = inject(Router);
        if (!auth.isLoggedIn() || !auth.isAdmin()) {
          router.navigate(['/dashboard']);
          return false;
        }
        return true;
      }
    ]
  }
];
