import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

export interface ReviewCounts {
  total: number;
  complete: number;
  incomplete: number;
}

export const ReviewTypes = {
  closed: 'Closed',
  ips: 'IPS Activity',
  person: 'Person Level',
  jobdev: 'Job Development',
  staffing: 'Staffing Level'
};

export interface PendingReviewResponse{
  review_type: string,
  review_id: string
}
@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  

  private reviewCountsSubject = new BehaviorSubject<ReviewCounts>({
    total: 0,
    complete: 0,
    incomplete: 0,
  });
  ReviewCounts$ = this.reviewCountsSubject.asObservable();

  private pendingReviewsSubject = new BehaviorSubject<PendingReviewResponse[]>([]);
  pendingReviews$ = this.pendingReviewsSubject.asObservable();

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getReviewCounts() {
    let result = this.http
      .get<ReviewCounts>(`${this.baseUrl}/review/counts`)
      .pipe(
        tap((res) => {
          this.reviewCountsSubject.next(res);
          console.log('review counts: ', res);
        })
      );
    return result;
  }
  getPendingReviews() {
    let result = this.http.get<PendingReviewResponse[]>(`${this.baseUrl}/reviews/pending`).pipe(
      tap((response) => {
        this.pendingReviewsSubject.next(response);
        console.log('pending reviews: ', response);
      })
    );
    return result;
  }
}
