import { Component } from '@angular/core';

type TNavLink = {
  path: string;
  label: string;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  navLinks: TNavLink[] = [
    { path: '', label: 'Home' },
    { path: 'admin', label: 'Admin' },
  ];
  year = new Date().getFullYear();
}
