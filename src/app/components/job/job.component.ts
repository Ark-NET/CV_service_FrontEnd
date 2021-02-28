import { Component, OnInit, Input } from '@angular/core';
import { User } from "../../models/user"
import { ValidationService } from "../../services/validation.service"
import { sortArry } from "../../services/template-functions.service";
import { IDisposalBasket } from '../../models/Interface';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent {

  @Input() user: User = new User();
  @Input() basket: IDisposalBasket = {
    education: [],
    links: [],
    jobs: []
  };
  public job = "";
  public work_status = "";
  public from_year = "";
  public to_year = "";
  public about = "";

  public errorMess = "";
  constructor(private validation: ValidationService) { }

  public deleteJob(item: any): void {
    var index = this.user.jobs.indexOf(item, 0);
    if (index > -1) {
      this.user.jobs.splice(index, 1);
      this.basket.jobs.push(item.id)
    }
  }

  public addJob(): void {
    if (this.formValidation()) {
      this.user.jobs.push({
        "id": 0, "job": this.job,
        "work_status": this.work_status,
        "from_year": this.from_year,
        "to_year": this.to_year == "" ? null : this.to_year,
        "about": this.about
      })

      sortArry(this.user.jobs);
      this.job = "";
      this.work_status = "";
      this.from_year = "";
      this.to_year = "";
      this.about = "";
      this.errorMess = "";
    }
    else {
      this.errorMess = "Fields cannot be empty: 'Last job place', 'Start work', 'Position' ";
    }

  }

  private formValidation(): boolean {

    const arrValidationFilde: Array<boolean> = []

    arrValidationFilde.push(this.validation.isEmpty(this.job));
    arrValidationFilde.push(this.validation.isEmpty(this.work_status));
    arrValidationFilde.push(this.validation.isEmpty(this.from_year));

    return arrValidationFilde.indexOf(true) >= 0 ? false : true;
  }

  public checkValidation(id: string, item: string, classCss: string = "borderError"): void {
    if (this.validation.isEmpty(item)) {
      document.getElementById(id)?.classList.add(classCss);
    }
    else document.getElementById(id)?.classList.remove(classCss);
  }

  public checkFromDate(id: string, start: string, end: string, classCss: string = "borderError"): void {
    if (this.validation.startDateIsGreater(start, end) || this.validation.isEmpty(start)) {
      document.getElementById(id)?.classList.add(classCss);
    }
    else document.getElementById(id)?.classList.remove(classCss);
  }

  public checkToDate(id: string, start: string, end: string, classCss: string = "borderError"): void {
    if (end != "" && end != null) {
      if (this.validation.startDateIsGreater(start, end)) {
        document.getElementById(id)?.classList.add(classCss);
      }
      else document.getElementById(id)?.classList.remove(classCss);
    }
    else document.getElementById(id)?.classList.remove(classCss);
  }
}
