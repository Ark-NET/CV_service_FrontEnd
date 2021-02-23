import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestDBService } from '../../services/httpClient'
import { User } from "../../models/user"

@Component({
  selector: 'app-cv-view-model',
  templateUrl: './cv-view-model.component.html',
  styleUrls: ['./cv-view-model.component.scss']
})
export class CvViewModelComponent implements OnInit {

  public id: number;
  constructor(

    private activateRoute: ActivatedRoute,
    private request: RequestDBService,
    private user: User
  ) {

    this.id = activateRoute.snapshot.params['id'];
  }
  public ngOnInit(): void {
    console.log(this.id);

    this.request.userGET(this.id).subscribe((data) => {
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
    )
  }



}
