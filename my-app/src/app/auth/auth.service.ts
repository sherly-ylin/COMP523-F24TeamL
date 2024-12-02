import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

interface LoginResponse {
  accessToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private http = inject(HttpClient);

  private authenticated = false;

  constructor() { }

  isAuthenticated(): boolean {
    // // Implement your authentication logic here
    // const token = localStorage.getItem('token'); // get token from local storage
    // if (token === null) {
    //   return false;
    // }
    // const payload = atob(token.split('.')[1]); // decode payload of token
    // const parsedPayload = JSON.parse(payload); // convert payload into an Object
    // return parsedPayload.exp > Date.now() / 1000; // check if token is expired
    return this.authenticated;
  }

  signIn(username: string, password: string): void {
    this.http
      .post<LoginResponse>('http://localhost:3000/api/auth/signin', {
        username,
        password,
      })
      .pipe(
        // Handle any errors with a fallback
        catchError((error) => {
          alert(error?.error?.message || 'An error occurred during sign-in.');
          console.error('Sign-in error:', error);
          return of(null); // Return a null observable to prevent breaking the stream
        }),
      )
      .subscribe({
        next: (response) => {
          if (response && response.accessToken) {
            // Storing token and navigating to the dashboard
            localStorage.setItem('accessToken', response.accessToken);
            console.log('Access token stored:', response.accessToken);
            this.authenticated = true;
            this.router.navigate(['./dashboard']);
          } else {
            alert('Invalid response or missing access token.');
          }
        },
      });
  }

  signOut(): void {
    // Perform logout actions
    this.authenticated = false;
  }

}


// export class AuthService {
  
//   private loggedIn = new BehaviorSubject<boolean>(false);
//   loggedIn$ = this.loggedIn.asObservable();


//   isLoggedIn(): boolean {
//     return !!localStorage.getItem('accessToken'); //convert the result into a strict Boolean value (true or false)
//   }

//   /**
//    * Adds a user to user array.
//    *
//    * @returns Event object.
//    */

//   // addUser(e: User): Observable<User> {
//   //   return this.http.post<User>("/api/auth/signup", e);
//   // }

//   isAdmin(): Observable<any> {
//     return this.http.get('localhost:3000/API/test/admin');
//   }
// }
