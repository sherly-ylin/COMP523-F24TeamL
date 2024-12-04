import { APP_ID, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SetPasswordComponent } from '../set-password/set-password.component'

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css'],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    SetPasswordComponent,
  ],
})
export class SignUpPageComponent implements OnInit {
  private router = inject(Router);
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);

  signUpForm!: FormGroup;
  token!: string;
  email!: string;

  clearUsernameField() {
    this.username?.setValue('');
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

  public onSubmit() {
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
          this.router.navigate(['']);
        },
        error: (error) => {
          alert(error.error.message);
          console.error(error);
        },
      });
  }
}
