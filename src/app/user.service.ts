import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';
  private postsUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getUserPosts(userId: number): Observable<any> {
    return this.http.get<any>(`${this.postsUrl}?userId=${userId}`);
  }
  private handleError(error: HttpErrorResponse) {
    console.error('API request failed:', error);
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }
}

