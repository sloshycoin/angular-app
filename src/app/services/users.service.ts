import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from '../models/user';

interface Authentication {
  auth: string;
  message: string;
}

interface Registration {
  message: string;
  registered: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:4000/api';

  constructor(private http: HttpClient, private router: Router) {}

  getUser(username: string, email: string): Observable<User[]> {
    return this.http.post<User[]>(`${this.apiUrl}/users`, { username, email });
  }

  login(username: string, password: string): Observable<Authentication> {
    return this.http.post<Authentication>(`${this.apiUrl}/login`, { username, password });
  }

  register(username: string, email: string, password: string): Observable<Registration> {
    return this.http.post<Registration>(`${this.apiUrl}/register`, {
      username,
      email,
      password,
    });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
