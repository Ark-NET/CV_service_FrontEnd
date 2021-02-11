import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  isEmpty(str: string): boolean {

    if (str) {
      if (str.trim().length > 0) return false;
      else return true;
    }
    else return true;


  }
}
