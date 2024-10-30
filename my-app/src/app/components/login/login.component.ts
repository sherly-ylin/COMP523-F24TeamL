import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

interface LoginResponse {
  accessToken: string;
}


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule]
})

export class LoginComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  
  public signInForm = this.formBuilder.group({
    email: this.email,
    password: this.password
  })

  constructor(
    public authService: AuthService,
    private router: Router, 
    private http: HttpClient,
    protected formBuilder: FormBuilder) { 
      this.signInForm.setValue({
        email: this.email.value,
        password: this.password.value
      })
    }

  public onSubmit() {
    if (this.signInForm.valid) {
      this.authService.signIn(this.email.value??'', this.password.value??'');
    }
  }
}
