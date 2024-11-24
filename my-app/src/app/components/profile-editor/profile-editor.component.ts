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
  public profileForm: FormGroup;
  loading = true;
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
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      // passward: '',
    });

    // this.token = `${localStorage.getItem('accessToken')}`;
  }

  ngOnInit(): void {
    this.profileService.getProfile().subscribe({
      next: (profile: Profile) => {
        this.profileForm.patchValue(profile);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load profile. Please try again.';
        this.loading = false;
      },
    });
    // let profile = this.profile;
    // this.profileForm.setValue({
    //   first_name: profile.first_name,
    //   last_name: profile.last_name,
    //   email: profile.email,
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
