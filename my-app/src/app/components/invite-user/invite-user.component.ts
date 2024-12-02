import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.css'],
  imports: [FormsModule, MatRadioModule, MatInputModule, MatButtonModule],
})
export class InviteUserComponent {
  private router = inject(Router);
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  email: string;
  role: string;
  timespanString: string;
  timespan: { value: number; unit: string };
  submitted: boolean;

  constructor() {
    this.email = '';
    this.role = 'Provider';
    this.timespanString = '3 day';
    this.timespan = { value: 3, unit: 'day' };
    this.submitted = false;
  }

  onTimespanChange() {
    const [value, unit] = this.timespanString.split(' '); // Split string into value and unit
    this.timespan = {
      value: parseInt(value, 10), // Convert the decimal value part to a number
      unit: unit || 'day', // Default to "day" if no unit found
    };
  }

  public onSubmit() {
    this.submitted = true;

    if (this.email && this.role) {
      this.http
        .post('http://localhost:3000/api/auth/invite', {
          email: this.email,
          role: this.role,
          timespan: this.timespan,
        })
        .subscribe({
          next: (response) => {
            console.log(response);
            alert('Invite email sent.');
          },
          error: (error) => {
            console.log('There is an error');
            alert(error.error.message);
            console.error(error);
          },
        });
    }
  }
}
