import { Component, OnInit } from '@angular/core';
import { ValidationService } from "../../services/validation.service";
import { RequestDBService } from "../../services/request-db.service";
import { LocalStorageService } from "../../services/local-storage.service";
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { Parser } from '@angular/compiler/src/ml_parser/parser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  errorMess: string = "";
  CheckMeOut: boolean = false;
  inputemail: string = "";
  inputpassword: string = "";
  constructor(
    private valid: ValidationService,
    private request: RequestDBService,
    private router: Router,
    private storage: LocalStorageService
  ) { }


  ngOnInit(): void {

    const check = this.storage.getLocalStorage();
    if (check != null) {
      this.inputemail = check.email;
    }
  };



  isRemember(data: any) {
    if (this.CheckMeOut) {
      data.rem = true;
      this.storage.setLocalStorage(data);
    }
    else {
      data.rem = false;
      this.storage.setLocalStorage(data);
      // this.storage.deleteLocalStorage();
    }
  }

  login(login: string, password: string) {


    if (this.formValidation(login, password)) {

      this.isRemember({ "id": 1, "email": this.inputemail, "password": this.inputpassword });
      this.router.navigate(['edit']);
      // this.request.loginPOST(this.user).subscribe(
      //   (data) => {
      //     if (data.result) {
      //       this.isRemember({ "id": 1, "email": this.inputemail, "password": this.inputpassword }); //нужно прикрутить JWT
      //       this.router.navigate(['edit']);
      //     }
      //     else {
      //       this.errorMess = "Incorrect login or/and password ";
      //     }
      //   },

      //   (err) => {
      //     console.log(err);
      //   }
      // );
    }
    else {
      this.errorMess = "Fields Email address and Password cannot be empty";
    }
  }

  registrationRouter() {
    this.router.navigate(['registration']);
  }

  formValidation(login: string, password: string): boolean {
    if (!this.valid.isEmpty(login) && !this.valid.isEmpty(password)) return true;
    else return false
  }

}
