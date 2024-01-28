import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllService {
  private allLogsUrl = 'http://localhost:3000/alllog'; 

  constructor(private http: HttpClient) {}

  getAllLogs(): Observable<any> {
    return this.http.get(this.allLogsUrl);
  }
}
