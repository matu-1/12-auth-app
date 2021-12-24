import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
    `
      hr {
        margin-bottom: 1rem;
      }
    `,
  ],
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  get user() {
    return this.authService.user;
  }

  logout() {
    this.router.navigateByUrl('/auth/login');
    this.authService.logout();
  }
}
