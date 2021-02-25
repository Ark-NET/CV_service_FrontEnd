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

  public user = new User();
  public confirm_password = "";
  constructor(
    private router: Router,
    private request: RequestDBService,
    private storage: LocalStorageService,
    private validation: ValidationService
  ) { }

  ngOnInit(): void {
  }


  public registrationUser(): void {

    if (this.formValidation()) {

      this.request.userADD(this.user).subscribe((data) => {

        if (data.result) {
          this.storage.setLocalStorage({ "id": data.id, "login": data.login, "password": data.password });
          this.router.navigate(['edit']);
        }
        else {
          this.errorMess = "Registration error, please try again later";
        }
      }, (err) => {
        console.log(err);
        this.errorMess = "Registration error, please try again later";
      });
    }
    else {
      this.errorMess = "All fields must be filled"
    }
  }

  public cancelActio(): void {
    this.router.navigate(['']);
  }

  private formValidation(): boolean {
    const arrValidationFilde: Array<boolean> = []

    arrValidationFilde.push(this.validation.isEmpty(this.user.full_name));
    arrValidationFilde.push(this.validation.isEmpty(this.user.login));
    arrValidationFilde.push(this.validation.isEmpty(this.user.phone));
    arrValidationFilde.push(this.validation.isEmpty(this.user.password));
    arrValidationFilde.push(this.validation.isEmpty(this.user.email));

    arrValidationFilde.push(!this.validation.isEqual(this.user.password, this.confirm_password))
    console.dir(arrValidationFilde);
    console.dir(this.user);

    return arrValidationFilde.indexOf(true) >= 0 ? false : true;
  }
}
