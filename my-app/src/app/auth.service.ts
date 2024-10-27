import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
interface LoginResponse {
  accessToken: string;
}

export interface User {
  username: string;
  id: number | null;
  email: string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();

  constructor(
    private router: Router,
    private http: HttpClient) { 
  }

  signIn(email: string, password: string){
    this.http.post<LoginResponse>('http://localhost:3000/api/auth/signin', {
      email: email,
      password: password
    }).subscribe(response => {
      console.log(response);
      localStorage.setItem('accessToken', response.accessToken);
      const value = localStorage.getItem('accessToken');
      console.log(value); // Should log 'testValue' if successful
   
      this.router.navigate(['./home']);
    }, error => {
      alert(error.error.message);
      console.error(error);
    });
  }


  /**
   * Adds a user to user array.
   * 
   * @returns Event object.
   */
  
  // addUser(e: User): Observable<User> {
  //   return this.http.post<User>("/api/auth/signup", e);
  // }


  isAdmin(): Observable<any> {
    return this.http.get('localhost:3000/API/test/admin');
  }
}
