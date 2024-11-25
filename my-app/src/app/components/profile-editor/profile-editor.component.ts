import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Profile, ProfileService } from '../../profile.service';
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
    protected profileService: ProfileService,
    protected snackBar: MatSnackBar,
    protected dialog: MatDialog
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
    
    // this.profileService.getProfile().subscribe({
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
  public onSubmit() {
    if (this.profileForm.valid) {
      this.profileService.updateProfile(this.profileForm.value).subscribe({
        next: () => alert('Profile updated successfully!'),
        error: () => alert('Failed to update profile. Please try again.'),
      });
      //   const { first_name, last_name, email } = this.profileForm.value;
      //   this.profileService.updateProfile(first_name!, last_name!, email!);
      // }
    }
  }
}
