import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AllService {
  private http = inject(HttpClient);

  private allLogsUrl = 'http://localhost:3000/alllog';

  getAllLogs(): Observable<any> {
    return this.http.get(this.allLogsUrl);
  }
}
