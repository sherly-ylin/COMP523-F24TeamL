import { APP_ID, Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-sign-up-page',
    templateUrl: './sign-up-page.component.html',
    styleUrls: ['./sign-up-page.component.css'],
    standalone: true,
    imports: [FormsModule]
})
export class SignUpPageComponent {
  email: string;
  password: string;
  password2: string;
  submitted: boolean = false;
  match: boolean = true;
  role: string = "";

  constructor(private router: Router, private http: HttpClient, private authService: AuthService){
    this.email = "";
    this.password = "";
    this.password2 = "";
  }
  
  private checkPermission(){

  }

  public passwordStrength() {
    if (this.password.length > 3) {
      return "Strong";
    }
    return "Weak";
  }

  public onSubmit(){
      this.submitted = true;
      // random usernames?
      const username = "Test " + Math.floor(Math.random() * 100);

      if(this.password != this.password2) {
        this.match = false;
      }
      if(this.match == true && this.email && this.password) {
        //api post sign up
        //need to check permission string to confirm user identity
        this.checkPermissionString();
      
        this.http.post('http://localhost:3000/api/auth/signup'+ this.role, {
          username: username,
          roles: ['user'],
          email: this.email,
          password: this.password,
          role: this.role
        }).subscribe(response => {
          console.log(response);
          alert("Verification email sent. Please check your inbox.")
          this.router.navigate(['']);
        }, error => {
          alert(error.error.message);
          console.error(error);
        });
        
      }
  }

  private checkPermissionString(): boolean{

    // Check invite permission string

    if (true){
      // this.isProvider = true;
      // this.isEvaluator = true;
      // this.isAdmin = true;
      // this.role = "Admin";     // currently 'Superadmin'
      // this.role = "Evaluator"; //currently 'Admin'
      // this.role = "Provider";

    }
    

    return false;
  }
}
