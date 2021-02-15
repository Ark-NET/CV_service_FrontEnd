import { Component, Input, OnInit } from '@angular/core';
import { User } from "../../models/user"

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  @Input() user: User = new User();
  constructor() { }

  ngOnInit(): void {
  }

}
