import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Comment } from '../models/comment';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient, private config: ConfigService) {
    this.baseUrl = `${config.getConfig().forumApi.url}/comments`
  }

  public GetAll() {    
    return this.httpClient.get<Comment[]>(this.baseUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  public GetPosts(filterBy?: string, filterByValue?: string, orderBy?: string) {
    let params = new HttpParams();
    params = params.append('isPost', "true");

    if (filterBy)
      params = params.append(filterBy, filterByValue);

    if (orderBy)
      params = params.append("orderBy", orderBy);

    return this.httpClient.get<Comment[]>(this.baseUrl, { params: params })
      .pipe(
        catchError(this.handleError)
      );
  }

  public Get(commentId: string): Observable<Comment> {
    return this.httpClient.get<Comment>(`${this.baseUrl}/${commentId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  public GetReplies(commentId: string): Observable<Comment> {
    return this.httpClient.get<Comment>(`${this.baseUrl}/${commentId}/replies`)
      .pipe(
        catchError(this.handleError)
      );
  }

  public Add(comment: Comment): Observable<Comment> {
    return this.httpClient.post<Comment>(this.baseUrl, comment)
      .pipe(
        catchError(this.handleError)
      );
  }

  public Like(commentId: string): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/${commentId}/like`, null)
      .pipe(
        catchError(this.handleError)
      );    
  }

  public AddReply(commentId: string, comment: Comment): Observable<Comment> {
    return this.httpClient.post<Comment>(`${this.baseUrl}/${commentId}/replies`, comment)
      .pipe(
        catchError(this.handleError)
      );    
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError({
      error: error.error.message,
      status: error.status
    });
  };

}
