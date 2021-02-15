import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service'
import { Router } from '@angular/router';
import { RequestDBService } from "../../services/request-db.service";

@Component({
  selector: 'app-cv-edit-model',
  templateUrl: './cv-edit-model.component.html',
  styleUrls: ['./cv-edit-model.component.scss']
})
export class CvEditModelComponent implements OnInit {
  errorMess: string = "";
  user = {};
  constructor(
    private storage: LocalStorageService,
    private router: Router,
    private request: RequestDBService,
  ) { }

  ngOnInit(): void {
    // this.loadUser();
    this.user = {
      education: [{ "id": 1, "name": "Step", "specialization": "full dev steck", "from_year": '1991-01-01', "to_year": "2020-01-01" }],
      links: [{
        "id": 1, "name": "git", "link": "https://jhksdfjghsdfgjfd"
      }],
      jods: [{ "id": 1, "work_status": "Boss", "from_year": '1992-01-01', "to_year": "2022-01-01", "about": "ничего не делаю и получаю премии" }]
    };
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
