import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };
  apiURL = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<any> {
    return this.http.get(this.apiURL + '/tasks').pipe(retry(3), catchError(this.handleError));
  }

  getTask(id: number): Observable<any> {
    return this.http.get(this.apiURL + '/tasks/' + id).pipe(retry(3), catchError(this.handleError));
  }

  createTask(task: any): Observable<any> {
    return this.http.post(this.apiURL + '/tasks', task, this.httpOptions).pipe(retry(3), catchError(this.handleError));
  }

  updateTask(id: number, task: any): Observable<any> {
    return this.http.put(this.apiURL + '/tasks/' + id, task, this.httpOptions).pipe(retry(3), catchError(this.handleError));
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(this.apiURL + '/tasks/' + id, this.httpOptions).pipe(retry(3), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}

