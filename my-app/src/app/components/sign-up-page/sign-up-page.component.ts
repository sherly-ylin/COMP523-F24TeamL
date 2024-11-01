import { APP_ID, Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class SignUpPageComponent {
  public readonly PASSWORD_MIN_LENGTH = 8;
  public readonly PASSWORD_MIN_UPPER = 1;
  public readonly PASSWORD_MIN_LOWER = 1;
  public readonly PASSWORD_MIN_NUMBER = 1;
  public readonly PASSWORD_MIN_SYMBOL = 1;

  email = "";
  inviteCode = "";
  password = "";
  passwordHasFocus = false;
  confirmPassword = "";
  confirmPasswordHasFocus = false;
  passwordsMatch: boolean = false;
  submitted: boolean = false;
  role = "";

  constructor(private router: Router, private http: HttpClient, private authService: AuthService){
  }

  public passwordGainFocus() {
    this.passwordHasFocus = true;
  }

  public passwordLostFocus() {
    this.passwordHasFocus = false;
  }

  public confirmPasswordGainFocus() {
    this.confirmPasswordHasFocus = true;
  }

  public confirmPasswordLostFocus() {
    this.confirmPasswordHasFocus = false;
  }

  public passwordIsLongEnough(): boolean {
    return this.password.length >= this.PASSWORD_MIN_LENGTH;
  }

  public passwordHasUpperCase(): boolean {
    for (const char of this.password) {
      if ('A' <= char && char <= 'Z') {
        return true;
      }
    }
    return false;
  }

  public passwordHasLowerCase(): boolean {
    for (const char of this.password) {
      if ('a' <= char && char <= 'z') {
        return true;
      }
    }
    return false;
  }

  public passwordHasNumber(): boolean {
    for (const char of this.password) {
      if ('0' <= char && char <= '9') {
        return true;
      }
    }
    return false;
  }

  public passowrdHasSymbol(): boolean {
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return symbolRegex.test(this.password);
  }

  public passwordRequirementsSatisfied(): boolean {
    if (!this.passwordIsLongEnough()) {
      return false;
    }
    if (!this.passwordHasUpperCase()) {
      return false;
    }
    if (!this.passwordHasLowerCase()) {
      return false;
    }
    if (!this.passwordHasNumber()) {
      return false;
    }
    if (!this.passowrdHasSymbol()) {
      return false;
    }
    return true;
  }

  public onSubmit() {
      this.submitted = true;
      // random usernames?
      const username = "Test " + Math.floor(Math.random() * 100);

      if(this.password === this.confirmPassword) {
        this.passwordsMatch = true;
      }
      if(this.passwordsMatch == true && this.email && this.password) {
        //api post sign up
        //need to check permission string to confirm user identity
      
        this.http.post('http://localhost:3000/api/auth/signup'+ this.role, {
          username: username,
          roles: ['user'],
          email: this.email,
          password: this.password,
          role: this.role
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
