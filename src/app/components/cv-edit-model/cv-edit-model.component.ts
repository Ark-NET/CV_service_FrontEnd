import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service'
import { Router } from '@angular/router';
import { RequestDBService } from "../../services/request-db.service";
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-cv-edit-model',
  templateUrl: './cv-edit-model.component.html',
  styleUrls: ['./cv-edit-model.component.scss']
})
export class CvEditModelComponent implements OnInit {
  errorMess: string = "";
  user: User = new User();
  constructor(
    private storage: LocalStorageService,
    private router: Router,
    private request: RequestDBService,
  ) { }

  ngOnInit(): void {
    this.loadUser();

    this.user.setTESTdata();
  }

  loadUser() {
    const localUser = this.storage.getLocalStorage();
    if(localUser!=null){
    this.request.userGET(localUser.id).subscribe((data) => {
      if (data) {

        this.user.setAllUserData(
          data.id, data.full_name, data.login,
          data.password, data.email, data.phone,
          data.education, data.links, data.jods,
          data.face);
      }
    },
      (err) => {
        console.log(err);
      }
    )}
    else this.router.navigate(["/loging"])
  };

  saveUser() {

    console.dir(this.user)
  }

  loguot(){
    const localUser = this.storage.getLocalStorage();

    if(localUser.rem ==false){
      this.storage.deleteLocalStorage();
    }
    this.router.navigate(["/loging"])
  }
}
