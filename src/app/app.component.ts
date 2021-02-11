import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { ValidationService } from "./services/validation.service";
import { RequestDBService } from "./services/request-db.service";
import { LocalStorageService } from "./services/local-storage.service";
import { Router } from '@angular/router';
import { User } from './models/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  errorMess: string = "";
  user = {};
  constructor(
    private valid: ValidationService,
    private request: RequestDBService,
    private router: Router,
    private storage: LocalStorageService
  ) { }
  ngOnInit(): void {
    //если юзер был залогинен - отобразить его резюме без логина.Проверканаличия юзера в локал сторидже
    // this.router.navigate(['cv-edit-model']);
  };
  showeEditeModel(){

  }

  checkLogin(){
    //проверить залогинен ли юзер
  }
  login(login: string, password: string) {

    if (!this.valid.isEmpty(login) && !this.valid.isEmpty(password)) {
      //запрос
      this.request.loginGET().subscribe(
        (data) => {
          if (data.resulte) {
            this.user = new User(data.user.name, data.user.login);
            this.router.navigate(['cv-edit-model']);
            this.storage.setLocalStorage(this.user);
          }
        },

        (err) => {
          console.log(err);
        }
      );
    }
    else {
      this.errorMess = "INVALID";
    }
  }






}
