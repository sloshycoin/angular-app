import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingComponent } from './components/landing/landing.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, LandingComponent],
  template: '<app-header/><app-landing/><app-footer/>',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-app';
}
