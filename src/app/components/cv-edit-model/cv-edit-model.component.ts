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
    // this.loadUser();

    this.user.setTESTdata();
  }

  loadUser() {
    const localUser = this.storage.getLocalStorage();
    this.request.userGET(localUser.id).subscribe((data) => {
      if (data) {
        this.user = data
      }
    },
      (err) => {
        console.log(err);
      }

    )
  };

}
