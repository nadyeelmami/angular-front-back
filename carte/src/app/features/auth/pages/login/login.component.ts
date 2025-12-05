import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  signupForm: FormGroup;
  showPassword = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Redirection si déjà connecté
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }

    // Définition du formulaire
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Toggle visibilité du mot de passe
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Soumission du formulaire
  onSubmit() {
    this.errorMessage = '';
    console.log('Form valid:', this.signupForm.valid);
    console.log('Form values:', this.signupForm.value);

    if (this.signupForm.valid) {
      const { email, password, username } = this.signupForm.value;
      const success = this.authService.login(email, password);

      if (success) {
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Email ou mot de passe invalide';
      }
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs correctement';
    }
  }
}
