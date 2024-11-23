import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Profile, ProfileService } from '../../profile.service';
import { HttpClient } from '@angular/common/http';

import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
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
  standalone: true,
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
  public profile: Profile;
  public token: string;
  public showToken: boolean = false;

  public profileForm = this.formBuilder.group({
    first_name: '',
    last_name: '',
    email: '',
    // passward: '',
  });

  constructor(
    route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    protected formBuilder: FormBuilder,
    protected profileService: ProfileService,
    protected snackBar: MatSnackBar,
    protected dialog: MatDialog
  ) {
    const form = this.profileForm;
    form.get('first_name')?.addValidators(Validators.required);
    form.get('lastname')?.addValidators(Validators.required);
    form
      .get('email')
      ?.addValidators([
        Validators.required,
        Validators.email,
        Validators.pattern(/\.$/),
      ]);
    const data = route.snapshot.data as { profile: Profile };
    this.profile = data.profile;
    this.token = `${localStorage.getItem('accessToken')}`;
  }

  ngOnInit(): void {
    let profile = this.profile;
    this.profileForm.setValue({
      first_name: profile.first_name,
      last_name: profile.last_name,
      email: profile.email,
    });
  }
  public onSubmit() {
    if (this.profileForm.valid) {
      const { first_name, last_name, email } = this.profileForm.value;
      this.profileService.updateProfile(first_name!, last_name!, email!);
    }
  }
}
