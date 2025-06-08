import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  items: MenuItem[] = [
    { label: 'Feed', routerLink: '/quotes' },
    { label: 'Add Quote', routerLink: '/quotes/new' },
    { label: 'Profile', routerLink: '/profile' }
  ];
}
