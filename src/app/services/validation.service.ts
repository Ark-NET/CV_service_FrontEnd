import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  public isEmpty(str: string): boolean {

    if (str) {
      if (str.trim().length > 0) return false;
      else return true;
    }
    else return true;
  }

  public isEqual(str1: string, str2: string): boolean {

    if (str1 && str2) {

      if (str1 === str2) {
        return true;
      }
      else return false;
    }
    else return false;
  }

}
