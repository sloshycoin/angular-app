import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-landing',
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  welcomeMessage = signal('Welcome to the Landing page!');
}
