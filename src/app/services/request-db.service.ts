import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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

  public loginGET(): Observable<any> {

    return this.httpClient
      .get(apiBaseURL, httpOptions)
      .pipe(catchError(this.processError));
  }
}
