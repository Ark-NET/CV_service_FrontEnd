import { Component, OnInit } from '@angular/core';
import { ValidationService } from "../../services/validation.service";
import { RequestDBService } from "../../services/request-db.service";
import { LocalStorageService } from "../../services/local-storage.service";
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  errorMess: string = "";
  user = {};
  CheckMeOut: boolean = false;
  constructor(
    private valid: ValidationService,
    private request: RequestDBService,
    private router: Router,
    private storage: LocalStorageService
  ) { }


  ngOnInit(): void {

    this.editeModelRouter();
  };

  editeModelRouter() {
    const check = this.storage.getLocalStorage();
    if (check != null) {
      this.router.navigate(['cv-edit-model']);
    }
  }

  checkMeOut(data: object) {
    if (this.CheckMeOut) {
      this.storage.setLocalStorage(data);
    }
    else {
      this.storage.deleteLocalStorage();
    }
  }

  login(login: string, password: string) {


    if (!this.valid.isEmpty(login) && !this.valid.isEmpty(password)) {
      //запрос
      this.request.loginGET().subscribe(
        (data) => {
          if (data.resulte) {
            this.user = new User(data.name, data.login, data.id);
            this.checkMeOut(this.user);
            this.router.navigate(['cv-edit-model']);
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

  registrationRouter() {
    this.router.navigate(['registration']);
  }

}
