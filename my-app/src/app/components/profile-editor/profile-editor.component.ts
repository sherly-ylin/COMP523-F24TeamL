import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Profile, AuthService } from 'src/app/services/auth.service';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile-editor',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './profile-editor.component.html',
  styleUrl: './profile-editor.component.css',
})
export class ProfileEditorComponent {
  profile!: Profile;
  profileForm: FormGroup;
  emailForm: FormGroup;
  passwordForm: FormGroup;
  verificationForm: FormGroup;
  verificationSent: boolean = false;
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    protected formBuilder: FormBuilder,
    protected authService: AuthService,
    protected snackBar: MatSnackBar,
    protected dialog: MatDialog
  ) {
    this.authService.getProfile().subscribe({
      next: (profile: Profile) => {
        this.profile = profile;
        this.profileForm.patchValue(profile);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load profile. Please try again.';
        this.loading = false;
      },
    });
    this.profileForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      first_name: [''],
      last_name: [''],
    });

    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.verificationForm = this.formBuilder.group({
      code: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.passwordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: [
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
    const profileData = this.route.snapshot.data['profile'];
    if (profileData) {
      this.profileForm.patchValue(profileData);
      this.profile = profileData;
    }
  }

  // Getters for easy access in template
  get password() {
    return this.passwordForm.get('newPassword');
  }
  get confirmPassword() {
    return this.passwordForm.get('confirmPassword');
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
    const password = control.parent?.get('newPassword');
    const confirmPassword = control.parent?.get('confirmPassword');
    return password?.invalid || password?.value == confirmPassword?.value
      ? null
      : { passwordsDontMatch: true };
  }

  public updateProfile() {
    if (this.profileForm.valid) {
      this.authService.updateProfile(this.profileForm.value).subscribe({
        next: () => alert('Profile updated successfully!'),
        error: () => alert('Failed to update profile. Please try again.'),
      });
    }
  }

  requestEmailChange(): void {
    if (this.emailForm.valid) {
      const email = this.emailForm.value.email;
      this.authService.requestEmailChange(email).subscribe({
        next: () => {
          this.verificationSent = true;
        },
        error: () => alert('Failed to send verification code.'),
      });
    }
  }

  updateEmail(): void {
    if (this.emailForm.valid) {
      this.authService
        .verifyAndUpdateEmail(
          this.emailForm.value.email,
          this.verificationForm.value.code
        )
        .subscribe({
          next: (response: boolean | null) => {
            if (response) {
              this.authService
                .updateProfile({ email: this.emailForm.value.email })
                .subscribe({
                  next: (response: any) => console.log(response),
                });
              alert('Email update complete.');
            } else if (response == false) {
              console.log('response', response);
              alert('Invalid verification code.');
            }
          },
          error: () => alert('Failed to update email'),
        });
    }
  }

  updatePassword(): void {
    if (this.passwordForm.valid) {
      this.authService
        .updatePassword({
          oldPassword: this.passwordForm.value.currentPassword,
          newPassword: this.passwordForm.value.newPassword,
        })
        .subscribe({
          next: () => alert('Password updated successfully'),
          error: () => alert('Failed to update password'),
        });
    }
  }

  cancelEmailUpdate() {
    this.emailForm.setValue({ email: '' });
  }
}
