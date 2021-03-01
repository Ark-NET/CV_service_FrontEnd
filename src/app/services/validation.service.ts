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

  public isEqualDate(date1: Date, date2: Date): boolean {

    if (date1 && date2) {

      if (date1.getTime() == date2.getTime()) {
        return true;
      }
      else return false;
    }
    else return false;
  }

  public startDateIsGreater(start: string, end: string): boolean {
    if (start && end) {

      const startDate=new Date(start);
      const endDate=new Date(end);
      if (startDate.getTime() >= endDate.getTime()) {
        return true;
      }
      else return false;
    }
    else {
      if (start!=null && end == "") return false;
      else return true;
    }

  }

}
