import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestDBService } from "../../services/httpClient"
import { User } from "../../models/user";
import { LocalStorageService } from "../../services/local-storage.service"
import { ValidationService } from "../../services/validation.service"
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public errorMess = "";

  public full_name = ""
  public login = ""
  public password = ""
  public email = ""
  public phone = ""
  constructor(
    private router: Router,
    private request: RequestDBService,
    private storage: LocalStorageService,
    private validation: ValidationService
  ) { }

  ngOnInit(): void {
  }


  registrationUser() {
    if (this.formValidation()) {

      const user = new User();
      user.setRegistartionUserData(this.full_name, this.login, this.password, this.email, this.phone);

      this.request.userADD(user).subscribe((data) => {

        if (data.result) {
          this.storage.setLocalStorage({ "id": data.id, "login": data.login, "password": data.password });
        }
        else {
          this.errorMess = "Error";
        }
      }, (err) => {
        console.log(err);
        this.errorMess = "Error";
      });

      this.router.navigate(['edit']);
    }
  }

  cancelActio() {
    this.router.navigate(['']);
  }

  private formValidation(): boolean {
    const arrValidationFilde: Array<boolean> = []

    arrValidationFilde.push(this.validation.isEmpty(this.full_name));
    arrValidationFilde.push(this.validation.isEmpty(this.login));
    arrValidationFilde.push(this.validation.isEmpty(this.phone));
    arrValidationFilde.push(this.validation.isEmpty(this.password));
    arrValidationFilde.push(this.validation.isEmpty(this.email));

    return arrValidationFilde.indexOf(true) >= 0 ? false : true;
  }
}
