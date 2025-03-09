import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  footer = signal('Angular Application created by Brendan A. Burgee');
  email_link = signal('mailto:brendanburgee@gmail.com');
}
