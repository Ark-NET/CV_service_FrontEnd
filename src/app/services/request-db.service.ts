import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user';
import {

  HttpClient,
  HttpHeaders,
  HttpErrorResponse

} from '@angular/common/http';


const apiBaseURL = 'http://localhost:5000';

const httpOptions = {

  headers: new HttpHeaders({ Accept: 'application/json' })

};

@Injectable({
  providedIn: 'root'
})
export class RequestDBService {

  constructor(private httpClient: HttpClient) { };

  private processError(error: HttpErrorResponse) {
    return throwError(error);
  };

  public loginPOST(user: any): Observable<any> {

    return this.httpClient
      .post(apiBaseURL, user, httpOptions)
      .pipe(catchError(this.processError));
  }

  public userGET(id: number): Observable<any> {

    return this.httpClient
      .get(apiBaseURL + `/${id}`, httpOptions)
      .pipe(catchError(this.processError));
  }

  public userUPD(user: User): Observable<any> {

    return this.httpClient
      .put(apiBaseURL, user, httpOptions)
      .pipe(catchError(this.processError));
  }

  public userADD(user: User): Observable<any> {

    return this.httpClient
      .post(apiBaseURL, user, httpOptions)
      .pipe(catchError(this.processError));
  }

}
