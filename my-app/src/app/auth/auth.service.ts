import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated = false;
  private email = '';

  constructor() { }

  getEmail(): string {
    return this.email;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  isAuthenticated(): boolean {
    // Implement your authentication logic here
    const token = localStorage.getItem('token'); // get token from local storage
    if (token === null) {
      return false;
    }
    const payload = atob(token.split('.')[1]); // decode payload of token
    const parsedPayload = JSON.parse(payload); // convert payload into an Object
    return parsedPayload.exp > Date.now() / 1000; // check if token is expired
    return this.authenticated;
  }

  login(): void {
    // Perform login actions
    this.authenticated = true;
  }
  logout(): void {
    // Perform logout actions
    this.authenticated = false;
  }

}
