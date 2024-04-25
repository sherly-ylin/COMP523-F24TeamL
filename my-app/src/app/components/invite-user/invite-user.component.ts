import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.css']
})
export class InviteUserComponent {
  email: string;
  isSuperadmin: boolean;
  isAdmin: boolean;
  isProvider: boolean;
  submitted: boolean = false;

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) {
    this.email = "";
    this.isSuperadmin = false;
    this.isAdmin = false;
    this.isProvider = false;
  }

  public onSubmit() {
    this.submitted = true;

    var roleCount = 0;
    var role = "";
    if (this.isSuperadmin) {
      roleCount += 1;
      role = "superadmin";
    }
    if (this.isAdmin) {
      roleCount += 1;
      role = "admin";
    }
    if (this.isProvider) {
      roleCount += 1;
      role = "provider";
    }
    if (roleCount == 0) {
      alert("Please select the role of the user you want to invite.");
    } else if (roleCount > 1) {
      alert("Please only select one role.");
    }
    if (this.email && roleCount == 1) {
      this.http.post('http://localhost:3000/api/auth/invite', {
        email: this.email,
        role: role
      }).subscribe(response => {
        console.log(response);
        alert("Invite email sent.");
      }, error => {
        console.log('There is error')
        alert(error.error.message);
        console.error(error);
      });
    }
  }
}
