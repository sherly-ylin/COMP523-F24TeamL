import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Profile, AuthService } from 'src/app/auth.service';
import { HttpClient } from '@angular/common/http';

import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
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
  profileForm: FormGroup;
  emailForm: FormGroup;
  passwordForm: FormGroup;
  loading = false;
  error: string | null = null;
  // public token: string;
  // public showToken: boolean = false;

  constructor(
    route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    protected formBuilder: FormBuilder,
    protected authService: AuthService,
    protected snackBar: MatSnackBar,
    protected dialog: MatDialog,
  ) {
    this.profileForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
    });
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.passwordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
    // this.token = `${localStorage.getItem('accessToken')}`;
  }

  ngOnInit(): void {
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
      this.authService.updateProfile(this.profileForm.value).subscribe({
        next: () => alert('Profile updated successfully!'),
        error: () => alert('Failed to update profile. Please try again.'),
      });
      //   const { first_name, last_name, email } = this.profileForm.value;
      //   this.authService.updateProfile(first_name!, last_name!, email!);
      // }
    }
  }
  updateEmail(): void {
    if (this.emailForm.valid) {
      this.authService.updateEmail(this.emailForm.value.email).subscribe({
        next: () =>
          alert(
            'Email update initiated. Please check your inbox for verification.',
          ),
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
}
