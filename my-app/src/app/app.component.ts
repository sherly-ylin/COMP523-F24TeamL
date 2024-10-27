import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'my-app';
  authenticated = false;
  constructor(
    private router: Router,
    private authService: AuthService) {
    this.authenticated = this.isLoggedIn();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  signOut(): void {
    localStorage.removeItem('accessToken');
    this.router.navigate(['']); // Navigate to login after sign out
  }

  
}
