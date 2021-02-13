import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cv-view-model',
  templateUrl: './cv-view-model.component.html',
  styleUrls: ['./cv-view-model.component.scss']
})
export class CvViewModelComponent implements OnInit {

  id: number;
  constructor(private activateRoute: ActivatedRoute) {

    this.id = activateRoute.snapshot.params['id'];
  }
  ngOnInit(): void {
    console.log(this.id);
  }



}
