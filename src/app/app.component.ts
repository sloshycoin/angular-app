import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LandingComponent } from './components/landing/landing.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, NavbarComponent, LandingComponent, FooterComponent],
  template: '<app-header/><app-navbar/><app-landing/><app-footer/>',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-app';
}
