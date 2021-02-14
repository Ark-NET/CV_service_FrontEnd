import { Injectable } from '@angular/core';
import {User} from "../models/user"

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  key: string = "CV";
  constructor() { }

  setLocalStorage(user: any) {
    const value = JSON.stringify(user);
    localStorage.setItem(this.key, value);
  }

  getLocalStorage(): User {
    var obj = localStorage.getItem(this.key);
    var value = obj != null ? JSON.parse(obj) : null;
    return value;
  }

  deleteLocalStorage(){
    localStorage.removeItem(this.key);
  }

}
