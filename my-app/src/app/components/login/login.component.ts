import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ], // FormsModule is not needed unless you're using template-driven forms
})
export class LoginComponent implements OnInit {
  public signInForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    // Initialize form with validation rules
    this.signInForm = this.formBuilder.group({
      username: ['', [Validators.required]], //, Validators.email
      password: ['', [Validators.required]],
    });
  }

  // Mark all controls as touched to show validation errors on submit
  private markAllControlsAsTouched(): void {
    Object.values(this.signInForm.controls).forEach((control) => {
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
  public onSubmit(): void {
    if (this.signInForm.valid) {
      const { username, password } = this.signInForm.value;
      this.authService.signIn(username, password);
    } else {
      this.markAllControlsAsTouched(); // To trigger form validation feedback on UI
    }
  }
}
