import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user';
import { DisposalBasket } from "../models/disposal-basket"
import {

  HttpClient,
  HttpHeaders,
  HttpErrorResponse

} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RequestDBService {

  private apiBaseURL = 'http://localhost:5000';

  private httpOptions = {

    headers: new HttpHeaders({ Accept: 'application/json' })

  };
  constructor(
    private httpClient: HttpClient) { };

  private processError(error: HttpErrorResponse) {
    return throwError(error);
  };

  public loginPOST(user: any): Observable<any> {

    return this.httpClient.post(this.apiBaseURL + "/login", user, this.httpOptions).pipe(catchError(this.processError));
  }

  public userGET(id: number): Observable<any> {

    return this.httpClient.get(this.apiBaseURL + `/${id}`, this.httpOptions).pipe(catchError(this.processError));
  }

  public userUPD(user: User): Observable<any> {

    return this.httpClient.put(this.apiBaseURL, user, this.httpOptions).pipe(catchError(this.processError));
  }

  public userADD(user: User): Observable<any> {

    return this.httpClient.post(this.apiBaseURL + "/registration", user, this.httpOptions).pipe(catchError(this.processError));
  }
  public deleteData(obj: DisposalBasket): Observable<any> {

    return this.httpClient.post(this.apiBaseURL, obj, this.httpOptions).pipe(catchError(this.processError));
  }

}
