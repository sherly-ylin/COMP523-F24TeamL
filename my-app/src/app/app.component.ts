import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-root',
    template: '<router-outlet></router-outlet>'
    // templateUrl: './app.component.html',
    // styleUrls: ['./app.component.css']
    ,
    standalone: true,
    imports: [RouterOutlet]
})
export class AppComponent{
  title = 'ips';
  authenticated = false;
  constructor(
    private router: Router,
    private authService: AuthService) {
    this.authenticated = authService.isLoggedIn();
  }

  signOut(): void {
    localStorage.removeItem('accessToken');
    this.router.navigate(['']); // Navigate to login after sign out
  }

  
}
