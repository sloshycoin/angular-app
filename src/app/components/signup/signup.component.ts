import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService, Registration, Authentication } from '../../services/users.service';
import { Observable } from 'rxjs';

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

  constructor(private userService: UserService) { }

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

  onSubmit() {
    const registration$: Observable<Registration> = this.userService.register(this.username, this.email, this.password);
    registration$.subscribe(
      (response: Registration) => {
        console.log('Registration successful:', response.registered);
        const login$: Observable<Authentication> = this.userService.login(this.username, this.password);
        login$.subscribe(
          (response: Authentication) => {
            console.log('Login successful:', response.message);
            this.userService.setToken(response.auth);
          },
          (error) => {
            console.error('Login failed:', error);
          }
        );
      },
      (error) => {
        console.error('Registration failed:', error);
      }
    );
  }
}
