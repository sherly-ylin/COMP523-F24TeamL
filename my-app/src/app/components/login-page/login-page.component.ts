import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface LoginResponse {
  accessToken: string;
}


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent {
  email = '';
  password = '';
  submitted = false;

  constructor(private router: Router, private http: HttpClient) { }

  public onSubmit() {
    this.submitted = true;

    if (this.email && this.password) {
      this.http.post<LoginResponse>('http://localhost:3000/api/auth/signin', {
        email: this.email,
        password: this.password
      }).subscribe(response => {
        console.log(response);
        localStorage.setItem('accessToken', response.accessToken);
        const value = localStorage.getItem('accessToken');
        console.log(value); // Should log 'testValue' if successful
     
        this.router.navigate(['./home']);
      }, error => {
        alert(error.error.message);
        console.error(error);
      });
    }
  }
}
