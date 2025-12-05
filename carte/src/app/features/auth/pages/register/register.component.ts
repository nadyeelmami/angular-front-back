import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  signupForm: FormGroup;
  standalone=true;
  showPassword = false;
  errorMessage = '';
 
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (!this.signupForm.valid) {
      this.errorMessage = 'Veuillez remplir tous les champs correctement';
      return;
    }

    const { firstName, lastName, email, password } = this.signupForm.value;
    const success = this.authService.signup(firstName, lastName, email, password);

    if (success) {
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Erreur lors de l\'inscription';
    }
  }
}
