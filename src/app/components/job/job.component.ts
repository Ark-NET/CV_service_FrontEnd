import { Component, OnInit, Input } from '@angular/core';
import { User } from "../../models/user"
import { ValidationService } from "../../services/validation.service"
import { DisposalBasket } from 'src/app/models/disposal-basket';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  @Input() user: User = new User();
  @Input() basket = new DisposalBasket();
  job = "";
  work_status = "";
  from_year = "";
  to_year = "";
  about = "";

  errorMess = "";
  constructor(private validation: ValidationService) { }

  ngOnInit(): void {
  }

  deleteJob(item: any) {
    var index = this.user.jobs.indexOf(item, 0);
    if (index > -1) {
      this.user.jobs.splice(index, 1);
      if (item.id != 0) this.basket.jobs.push(item.id)
    }
  }

  addJob() {
    if (this.formValidation()) {
      this.user.jobs.push({
        "id": 0, "job": this.job,
        "work_status": this.work_status,
        "from_year": this.from_year,
        "to_year": this.to_year == "" ? null : this.to_year,
        "about": this.about
      })

      this.job = "";
      this.work_status = "";
      this.from_year = "";
      this.to_year = "";
      this.about = "";
      this.errorMess = "";
    }
    else {
      this.errorMess = "Fields cannot be empty: JOB, STATUS, FROM ";
    }

  }

  private formValidation(): boolean {

    const arrValidationFilde: Array<boolean> = []

    arrValidationFilde.push(this.validation.isEmpty(this.job));
    arrValidationFilde.push(this.validation.isEmpty(this.work_status));
    arrValidationFilde.push(this.validation.isEmpty(this.from_year));

    return arrValidationFilde.indexOf(true) >= 0 ? false : true;
  }

}
