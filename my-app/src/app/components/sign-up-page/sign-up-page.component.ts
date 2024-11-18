import { APP_ID, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AbstractControl, ValidationErrors } from '@angular/forms';

export function hasUpperCaseValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  return /[A-Z]/.test(value) ? null : { noUppercase: true };
}

export function hasLowerCaseValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  return /[a-z]/.test(value) ? null : { noLowercase: true };
}

export function hasNumberValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  return /\d/.test(value) ? null : { noNumber: true };
}

export function hasSymbolValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  return /[!@#$%^&*(),.?":{}|<>]/.test(value) ? null : { noSymbol: true };
}

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
})
export class SignUpPageComponent implements OnInit {
  readonly PASSWORD_MIN_LENGTH = 8;
  readonly PASSWORD_MIN_UPPER = 1;
  readonly PASSWORD_MIN_LOWER = 1;
  readonly PASSWORD_MIN_NUMBER = 1;
  readonly PASSWORD_MIN_SYMBOL = 1;

  public signUpForm!: FormGroup;

  token!: string;
  passwordsMatch: boolean = false;
  submitted: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') ?? '';

    // Initialize form with validation rules
    this.signUpForm = this.formBuilder.group({
      username: ['', []],
      password: ['', [Validators.required, Validators.minLength(this.PASSWORD_MIN_LENGTH), hasUpperCaseValidator, hasLowerCaseValidator, hasNumberValidator, hasSymbolValidator]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  // Getters for easy access in template
  get username() {
    return this.signUpForm.get('username');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
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
