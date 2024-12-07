import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private allReviewCountSubject = new BehaviorSubject<number>(0);
  allReviewCount$ = this.allReviewCountSubject.asObservable();

  private pendingReviewCountSubject = new BehaviorSubject<number>(0);
  pendingReviewCount$ = this.pendingReviewCountSubject.asObservable();
 
  private baseUrl = 'http://localhost:3000/review';

  constructor(private http: HttpClient) { }

  getAllReviewCounts(){
    let result = this.http.get<number>(`${this.baseUrl}/counts`)
    .pipe(
      tap((num)=>{
        this.allReviewCountSubject.next(num);
      console.log("# all reviews: ", num);
    }))
    return result;
  }
  getPendingReviewCounts(){
    let result = this.http.get<number>(`${this.baseUrl}/pending`)
    .pipe(
      tap((num)=>{
        this.allReviewCountSubject.next(num);
      console.log("# pending reviews: ", num);
    }))
    return result;
  }
  getCompletedReviewCounts(){
    let result = this.allReviewCountSubject.getValue()-this.pendingReviewCountSubject.getValue();
    console.log("# completed reviews: ", result);
    return result;
  }

}
