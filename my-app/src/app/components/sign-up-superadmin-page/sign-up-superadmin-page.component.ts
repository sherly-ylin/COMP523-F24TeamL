import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-sign-up-superadmin-page',
  templateUrl: './sign-up-superadmin-page.component.html',
  styleUrls: ['./sign-up-superadmin-page.component.css']
})
export class SignUpSuperadminPageComponent {
  email: string;
  password: string;
  password2: string;
  submitted: boolean = false;
  match: boolean = true;
  isProvider: boolean;

  constructor(private router: Router, private http: HttpClient, private authService: AuthService){
    this.email = "";
    this.password = "";
    this.password2 = "";
    this.isProvider = false;
  }

  public onSubmit(){
      this.submitted = true;
      const username = "Test " + Math.floor(Math.random() * 100);
      
      if(this.password != this.password2) {
        this.match = false;
      }
      if(this.match == true && this.email && this.password) {
        //api post sign up
        let role = 'admin'
        if (this.isProvider) {
          role = 'provider'
        }
        this.http.post('http://localhost:3000/api/auth/signupSuperadmin', {
          username: username,
          roles: ['user'],
          email: this.email,
          password: this.password,
          role: role
        }).subscribe(response => {
          console.log(response);
          alert("Verification email sent. Please check your inbox.")
          this.router.navigate(['']);
        }, error => {
          alert(error.error.message);
          console.error(error);
        });
      }
  }
}
