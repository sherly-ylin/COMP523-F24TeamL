import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { SetPasswordComponent } from '../set-password/set-password.component'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    SetPasswordComponent
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

  ngOnInit(): void {
    // Initialize form with validation rules
    this.signInForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
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

  get password() {
    return this.signInForm.get('password');
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
        next: (response) => {
          if (response) {
            this.emailVerified = true;
            this.resetPasswordForm = this.formBuilder.group({
              password: ['', [Validators.required]],
              confirmPassword: ['', [Validators.required]],
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
