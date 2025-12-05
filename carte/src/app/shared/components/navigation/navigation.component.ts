import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header class="top-nav">
      <div class="logo"><span class="blue-dot"></span> Talents</div>
      <nav class="nav-links">
        <a routerLink="/dashboard" routerLinkActive="active" class="nav-link">Dashboard</a>
        <a routerLink="/search" routerLinkActive="active" class="nav-link">Search</a>
        <a routerLink="/map" routerLinkActive="active" class="nav-link">Talents Map</a>
        <a routerLink="/collaboration" routerLinkActive="active" class="nav-link">Collaborate</a>
        <a routerLink="/profile" routerLinkActive="active" class="nav-link">Profile</a>
        <a *ngIf="isAdmin" routerLink="/admin/badges" routerLinkActive="active" class="nav-link">Admin</a>
      </nav>
      <button (click)="logout()" class="btn-logout">
        <i class="fa fa-sign-out"></i>
      </button>
    </header>
  `,
  styles: [`
    .top-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 40px;
    }

    .logo {
      font-weight: 700;
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .blue-dot {
      display: inline-block;
      width: 10px;
      height: 10px;
      background-color: #6142b9;
      border-radius: 50%;
    }

    .nav-links {
      display: flex;
      gap: 25px;
      flex: 1;
      margin-left: 60px;
    }

    .nav-link {
      color: #6c757d;
      text-decoration: none;
      font-size: 0.9rem;
      transition: 0.3s;
      position: relative;
    }

    .nav-link:hover, .nav-link.active {
      color: #ffffff;
    }

    .nav-link.active::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #6142b9;
    }

    .btn-logout {
      background: none;
      border: 1px solid #383e4a;
      color: #6c757d;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
      transition: 0.3s;
    }

    .btn-logout:hover {
      background-color: #383e4a;
      color: #ffffff;
      border-color: #6142b9;
    }
  `]
})
export class NavigationComponent {
  isAdmin = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.isAdmin = this.authService.isAdmin();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
