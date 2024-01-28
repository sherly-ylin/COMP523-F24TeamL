import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface User {
  id: number | null;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { 

  }

  /**
   * Adds a user to user array.
   * 
   * @returns Event object.
   */
  
  addUser(e: User): Observable<User> {
    return this.http.post<User>("/api/auth/signup", e);
  }


  isAdmin(): Observable<any> {
    return this.http.get('localhost:3000/API/test/admin');
  }
}
