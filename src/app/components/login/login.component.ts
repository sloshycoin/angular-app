import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService, Authentication } from '../../services/users.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private userService: UserService) { }

  onLogin() {
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
  }
}
