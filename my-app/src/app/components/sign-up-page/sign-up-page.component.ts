import { APP_ID, Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AbstractControl, ValidationErrors } from '@angular/forms';
import { stringify } from 'flatted';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css'],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class SignUpPageComponent implements OnInit {
  private router = inject(Router);
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);

  readonly PASSWORD_MIN_LENGTH = 8;
  readonly PASSWORD_MIN_UPPER = 1;
  readonly PASSWORD_MIN_LOWER = 1;
  readonly PASSWORD_MIN_NUMBER = 1;
  readonly PASSWORD_MIN_SYMBOL = 1;

  signUpForm!: FormGroup;
  token!: string;
  email!: string;

  isPasswordVisible = signal(false);
  isConfirmPasswordVisible = signal(false);
  togglePasswordVisibility(event: MouseEvent) {
    this.isPasswordVisible.set(!this.isPasswordVisible());
    event.stopPropagation();
  }
  toggleConfirmPasswordVisibility(event: MouseEvent) {
    this.isConfirmPasswordVisible.set(!this.isConfirmPasswordVisible());
    event.stopPropagation();
  }

  clearUsernameField() {
    this.username?.setValue('');
  }
  clearPasswordField() {
    this.password?.setValue('');
  }
  clearConfirmPasswordField() {
    this.confirmPassword?.setValue('');
  }
  resetConfirmPasswordField() {
    this.confirmPassword?.reset();
  }
  markConfirmPasswordUntouched() {
    this.confirmPassword?.markAsUntouched();
  }
  markConfirmPasswordUntouchedIfPasswordInvalid() {
    if (!this.password?.valid) {
      this.markConfirmPasswordUntouched();
    }
  }
  setUsernameDefaultValue() {
    if (this.username?.value.trim() === '') {
      this.username?.setValue(this.email);
    }
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') ?? '';
    this.route.data.subscribe((response: any) => {
      this.email = response.invite.email;
    });

    // Initialize form with validation rules
    this.signUpForm = this.formBuilder.group({
      username: [this.email, []],
      password: [
        '',
        [
          Validators.required,
          this.isLongEnoughValidator,
          this.hasUppercaseValidator,
          this.hasLowercaseValidator,
          this.hasNumberValidator,
          this.hasSymbolValidator,
        ],
      ],
      confirmPassword: [
        '',
        [Validators.required, this.passwordsMatchValidator],
      ],
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

  private isLongEnoughValidator = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const value = control.value;
    return value != null && value.length >= this.PASSWORD_MIN_LENGTH
      ? null
      : { notLongEnough: true };
  };
  private hasUppercaseValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const value = control.value;
    return /[A-Z]/.test(value) ? null : { noUppercase: true };
  }
  private hasLowercaseValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const value = control.value;
    return /[a-z]/.test(value) ? null : { noLowercase: true };
  }
  private hasNumberValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const value = control.value;
    return /\d/.test(value) ? null : { noNumber: true };
  }
  private hasSymbolValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const value = control.value;
    return /[!@#$%^&*(),.?":{}|<>]/.test(value) ? null : { noSymbol: true };
  }
  private passwordsMatchValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const password = control.parent?.get('password');
    const confirmPassword = control.parent?.get('confirmPassword');
    return password?.invalid || password?.value == confirmPassword?.value
      ? null
      : { passwordsDontMatch: true };
  }

  public onSubmit() {
    console.log("token:", this.token)
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
          this.router.navigate(['/login']);
        },
        error: (error) => {
          const errorMessage =
            error.error?.message ||
            'An error occurred. Please try again later.';
          alert(errorMessage);
          console.error('Error:', stringify(error));
        },
      });
  }
}