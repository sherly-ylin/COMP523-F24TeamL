import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Profile, AuthService } from 'src/app/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

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
  ],
  templateUrl: './profile-editor.component.html',
  styleUrl: './profile-editor.component.css',
})
export class ProfileEditorComponent {
  profile$: Observable<Profile | null>;
  profileForm: FormGroup;
  emailForm: FormGroup;
  passwordForm: FormGroup;
  verificationForm: FormGroup;
  verificationSent: boolean = false;
  loading = false;
  error: string | null = null;
  // public token: string;
  // public showToken: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    protected formBuilder: FormBuilder,
    protected authService: AuthService,
    protected snackBar: MatSnackBar,
    protected dialog: MatDialog
  ) {
    this.profile$ = this.authService.profile$;
    this.profileForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
    });

    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.verificationForm = this.formBuilder.group({
      code: ['', [Validators.required, Validators.minLength(8)]],
    });
    this.passwordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    const profileData = this.route.snapshot.data['profile'];
    console.log(profileData);

    if (profileData) {
      this.profileForm.patchValue(profileData);
    }
    // this.authService.getProfile().subscribe({
    //   next: (profile: Profile) => {
    //     this.profileForm.patchValue(profile);
    //     this.loading = false;
    //   },
    //   error: (err) => {
    //     this.error = 'Failed to load profile. Please try again.';
    //     this.loading = false;
    //   },
    // });
  }
  public updateProfile() {
    if (this.profileForm.valid) {
      console.log("profileForm:");
      console.log(this.profileForm.value)
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
          alert('Verification code sent to your email.');
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
          next: () => alert('Email update complete.'),
          error: () => alert('Failed to update email'),
        });
    }
  }

  updatePassword(): void {
    if (this.passwordForm.valid) {
      this.authService.updatePassword(this.passwordForm.value).subscribe({
        next: () => alert('Password updated successfully'),
        error: () => alert('Failed to update password'),
      });
    }
  }

  cancelEmailUpdate() {
    this.emailForm.setValue({ email: '' });
  }
}
