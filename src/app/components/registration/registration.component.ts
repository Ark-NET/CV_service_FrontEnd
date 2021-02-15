import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestDBService } from "../../services/request-db.service"
import { User } from "../../models/user";
import { LocalStorageService } from "../../services/local-storage.service"
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  errorMess: string = "";
  constructor(
    private router: Router,
    private request: RequestDBService,
    private storage: LocalStorageService,
  ) { }

  ngOnInit(): void {
  }


  registrationUser() {
    const user = new User();
    user.setRegistartionUserData("full_name: string", "login: string",
      "password: string", "email: string", "phone: string");

    this.request.userADD(user).subscribe((data) => {

      if (data.result) {
        this.storage.setLocalStorage({ "email": "sdfsd@sdf.sdf", "id": data.id });
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

  cancelActio() {
    this.router.navigate(['']);
  }
}
