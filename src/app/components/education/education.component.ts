import { Component, Input } from '@angular/core';
import { User } from "../../models/user"
import { ValidationService } from "../../services/validation.service"
import { sortArry } from "../../services/template-functions.service";
import { IDisposalBasket } from '../../models/Interface';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent {

  @Input() user: User = new User();
  @Input() basket: IDisposalBasket = {
    education: [],
    links: [],
    jobs: []
  };

  name = "";
  specialization = "";
  from_year = "";
  to_year = "";
  about = "";

  errorMess = "";
  constructor(
    private validation: ValidationService) { }

  public deleteEducation(item: any): void {
    var index = this.user.education.indexOf(item, 0);
    if (index > -1) {
      this.user.education.splice(index, 1);
      this.basket.education.push(item.id)
    }
  }

  public addEducation(): void {

    if (this.formValidation()) {
      this.user.education.push({
        "id": 0, "name": this.name,
        "specialization": this.specialization,
        "from_year": this.from_year,
        "to_year": this.to_year == "" ? null : this.to_year,
        "about": this.about
      })

      sortArry(this.user.education);

      this.name = "";
      this.specialization = "";
      this.from_year = "";
      this.to_year = "";
      this.about = "";
      this.errorMess = "";
    }
    else {
      this.errorMess = "Fields cannot be empty: 'Specialization', 'Start of studies', 'Education' ";
    }
  }

  private formValidation(): boolean {

    const arrValidationFilde: Array<boolean> = []

    arrValidationFilde.push(this.validation.isEmpty(this.name));
    arrValidationFilde.push(this.validation.isEmpty(this.specialization));
    arrValidationFilde.push(this.validation.isEmpty(this.from_year));
    arrValidationFilde.push(!this.validation.startDateIsGreater(new Date(this.from_year), new Date(this.to_year)));
    return arrValidationFilde.indexOf(true) >= 0 ? false : true;
  }
}
