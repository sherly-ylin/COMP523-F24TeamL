import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Profile, ProfileService } from '../profile.service';
@Component({
  selector: 'app-profile-editor',
  standalone: true,
  imports: [FormBuilder, Validators, MatSnackBar, MatDialog],
  templateUrl: './profile-editor.component.html',
  styleUrl: './profile-editor.component.css',
})
export class ProfileEditorComponent {
  private router = inject(Router);
  protected formBuilder = inject(FormBuilder);
  protected profileService = inject(ProfileService);
  protected snackBar = inject(MatSnackBar);
  protected dialog = inject(MatDialog);

  public profile: Profile;
  public token: string;
  public showToken: boolean = false;

  public profileForm = this.formBuilder.group({
    first_name: '',
    last_name: '',
    email: '',
  });
}
