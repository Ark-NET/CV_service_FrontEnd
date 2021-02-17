import { Component, Input, OnInit } from '@angular/core';
import { User } from "../../models/user"
import { ValidationService } from "../../services/validation.service"

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  @Input() user: User = new User();
  name = "";
  specialization = "";
  from_year = "";
  to_year = "";
  about = "";

  errorMess = "";
  constructor(private validation: ValidationService) { }

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

    if (this.formValidation()) {
      this.user.education.push({
        "id": 0, "name": this.name,
        "specialization": this.specialization,
        "from_year": this.from_year,
        "to_year": this.to_year == "" ? null : this.to_year,
        "about": this.about
      })

      this.name = "";
      this.specialization = "";
      this.from_year = "";
      this.to_year = "";
      this.about = "";
    }
    else {
      this.errorMess = "Fields cannot be empty: name, specialization, FROM ";
    }
  }

  private formValidation(): boolean {

    const arrValidationFilde: Array<boolean> = []

    arrValidationFilde.push(this.validation.isEmpty(this.name));
    arrValidationFilde.push(this.validation.isEmpty(this.specialization));
    arrValidationFilde.push(this.validation.isEmpty(this.from_year));

    return arrValidationFilde.indexOf(true) >= 0 ? false : true;
  }
}
