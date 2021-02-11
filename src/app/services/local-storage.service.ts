import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  key: string = "CV";
  constructor() { }

  setLocalStorage(user: object) {
    const value = JSON.stringify(user);
    localStorage.setItem(this.key, value);
  }

  getLocalStorage(): object {
    var obj = localStorage.getItem(this.key);
    var value = obj != null ? JSON.parse(obj) : {};

    return value;
  }
}
