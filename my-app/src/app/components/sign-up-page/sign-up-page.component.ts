import { APP_ID, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css'],
  standalone: true,
  imports: [FormsModule, MatInputModule, MatButtonModule],
})
export class SignUpPageComponent implements OnInit {
  readonly PASSWORD_MIN_LENGTH = 8;
  readonly PASSWORD_MIN_UPPER = 1;
  readonly PASSWORD_MIN_LOWER = 1;
  readonly PASSWORD_MIN_NUMBER = 1;
  readonly PASSWORD_MIN_SYMBOL = 1;
  private readonly symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;

  token!: string;
  username = '';
  password = '';
  passwordHasFocus = false;
  confirmPassword = '';
  confirmPasswordHasFocus = false;
  passwordsMatch: boolean = false;
  submitted: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token') ?? '';
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
    return /[A-Z]/.test(this.password);
  }

  public passwordHasLowerCase(): boolean {
    return /[a-z]/.test(this.password);
  }

  public passwordHasNumber(): boolean {
    return /\d/.test(this.password);
  }

  public passwordHasSymbol(): boolean {
    return this.symbolRegex.test(this.password);
  }

  public passwordRequirementsSatisfied(): boolean {
    const checks = [
      this.passwordIsLongEnough(),
      this.passwordHasUpperCase(),
      this.passwordHasLowerCase(),
      this.passwordHasNumber(),
      this.passwordHasSymbol(),
    ];

    return checks.every((check) => check);
  }

  public onSubmit() {
    this.submitted = true;

    if (this.password === this.confirmPassword && this.token) {
      this.http
        .post('http://localhost:3000/api/auth/signup', {
          token: this.token,
          username: this.username,
          password: this.password,
        })
        .subscribe({
          next: (response) => {
            console.log(response);
            alert('Verification email sent. Please check your inbox.');
            this.router.navigate(['']);
          },
          error: (error) => {
            alert(error.error.message);
            console.error(error);
          },
        });
    }
  }
}
