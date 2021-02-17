import { Component, Input, OnInit } from '@angular/core';
import { User } from "../../models/user"

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  @Input() user: User = new User();
  name:string="";
  specialization:string="";
  from_year:string="";
  to_year:string="";
  about:string="";
  constructor() { }

  ngOnInit(): void {
  }

  deleteEducation(item: any) {
    var index = this.user.education.indexOf(item, 0);
    if (index > -1) {
      this.user.education.splice(index, 1);
    }
    //нужно сохранить id для запроса удаления с базы
  }

  addEducation() {

    this.user.education.push({
      "id": 0, "name": this.name,
      "specialization": this.specialization,
      "from_year": this.from_year,
      "to_year": this.to_year==""? null:this.to_year,
      "about": this.about
    })

    this.name="";
    this.specialization="";
    this.from_year="";
    this.to_year="";
    this.about="";
  }
}
