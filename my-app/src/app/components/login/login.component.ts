import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private http = inject(HttpClient);
  private formBuilder = inject(FormBuilder);

  public signInForm!: FormGroup;
  public verifyEmailForm!: FormGroup;
  public resetPasswordForm!: FormGroup;
  public forgotPassword = false;
  public emailVerified = false;

  readonly PASSWORD_MIN_LENGTH = 8;
  readonly PASSWORD_MIN_UPPER = 1;
  readonly PASSWORD_MIN_LOWER = 1;
  readonly PASSWORD_MIN_NUMBER = 1;
  readonly PASSWORD_MIN_SYMBOL = 1;

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

  ngOnInit(): void {
    // Initialize form with validation rules
    this.signInForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get password() {
    return this.resetPasswordForm.get('password');
  }
  get confirmPassword() {
    return this.resetPasswordForm.get('confirmPassword');
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

  public onForgotPasswordClick(): void {
    this.forgotPassword = true;
    this.emailVerified = false;
    this.verifyEmailForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      verificationCode: ['', [Validators.required]],
    });
    const username = this.signInForm.get('username')?.value;
    this.verifyEmailForm.patchValue({ username });
  }

  onRememberPasswordClick(): void {
    this.forgotPassword = false;
  }

  sendVerificationCode(): void {
    this.authService.sendVerificationCode(this.verifyEmailForm.get('username')?.value);
  }

  // Mark all controls as touched to show validation errors on submit
  private markAllControlsAsTouched(targetForm: FormGroup): void {
    Object.values(targetForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  // Getters for easy access in template
  get username() {
    return this.signInForm.get('username');
  }

  // Form submission method
  public onSignIn(): void {
    if (this.signInForm.valid) {
      const { username, password } = this.signInForm.value;
      this.authService.signIn(username, password);
    } else {
      this.markAllControlsAsTouched(this.signInForm); // To trigger form validation feedback on UI
    }
  }

  public onVerifyEmail(): void {
    if (this.verifyEmailForm.valid) {
      const { username, verificationCode } = this.verifyEmailForm.value;
      this.authService.verifyEmail(username, verificationCode).subscribe({
        next: (response: boolean | null) => {
          if (response) {
            this.emailVerified = true;
            this.resetPasswordForm = this.formBuilder.group({
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
          } else if (response == false){
            console.log("response", response)
            alert('Invalid verification code.');
          }
        },
      });
    } else {
      this.markAllControlsAsTouched(this.verifyEmailForm);
    }
  }

  public onResetPassword() {
    if (this.resetPasswordForm.valid) {
      const username = this.verifyEmailForm.get('username')?.value;
      const password = this.resetPasswordForm.get('password')?.value;
      this.authService.resetPassword(username, password).subscribe({
        next: (response) => {
          if (response) {
            this.forgotPassword = false;
            this.signInForm.patchValue({ username });
          } else if (response == false){
            console.log("response", response)
            alert('Failed to reset password.');
          }
        },
      });
    } else {
      this.markAllControlsAsTouched(this.resetPasswordForm);
    }
  }
}
