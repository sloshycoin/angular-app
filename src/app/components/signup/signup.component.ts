import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  usernameError: string | null = null;
  emailError: string | null = null;
  passwordError: string | null = null;

  constructor() {
    console.log('SignupComponent constructor');
  }

  validateUsername() {
    const usernameRegex = /^[a-zA-Z0-9]{8,}$/;
    if (!usernameRegex.test(this.username)) {
      this.usernameError = 'Username must be at least 8 characters long and contain no special characters.';
    } else {
      this.usernameError = null;
    }
  }

  validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.emailError = 'Please enter a valid email address.';
    } else {
      this.emailError = null;
    }
  }

  validatePassword() {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    if (!passwordRegex.test(this.password)) {
      this.passwordError = 'Password must be at least 12 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character.';
    } else {
      this.passwordError = null;
    }
  }
}
