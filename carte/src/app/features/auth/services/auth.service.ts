import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  // 🔹 تسجيل الدخول
  login(email: string, password: string): boolean {
    if (email && password) {
      // نحاكي token
      localStorage.setItem('token', 'fake-jwt-token');
      localStorage.setItem('email', email);
      return true;
    }
    return false;
  }

  // 🔹 تسجيل مستخدم جديد
  signup(firstName: string, lastName: string, email: string, password: string): boolean {
    if (email && password && firstName && lastName) {
      localStorage.setItem('token', 'fake-jwt-token');
      localStorage.setItem('email', email);
      localStorage.setItem('firstName', firstName);
      localStorage.setItem('lastName', lastName);
      return true;
    }
    return false;
  }

  // 🔹 التحقق إذا المستخدم مسجّل دخول
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // 🔹 Check if user is admin
  isAdmin(): boolean {
    const email = localStorage.getItem('email');
    // Mock: admin users (can be extended)
    return email === 'admin@cesi.fr' || email === 'jgallet@cesi.fr';
  }

  // 🔹 Get current user info
  getCurrentUser(): { email: string; firstName: string; lastName: string } | null {
    const email = localStorage.getItem('email');
    if (!email) return null;
    return {
      email,
      firstName: localStorage.getItem('firstName') || '',
      lastName: localStorage.getItem('lastName') || ''
    };
  }

  // 🔹 تسجيل خروج
  logout() {
    localStorage.clear();
  }
}
