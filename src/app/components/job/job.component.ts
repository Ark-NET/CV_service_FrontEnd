import { Component, OnInit, Input } from '@angular/core';
import { User } from "../../models/user"

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  @Input() user: User = new User();
  job: string = "";
  work_status: string = "";
  from_year: string = "";
  to_year: string = "";
  about: string = "";
  constructor() { }

  ngOnInit(): void {
  }

  deleteJob(item: any) {
    var index = this.user.jods.indexOf(item, 0);
    if (index > -1) {
      this.user.jods.splice(index, 1);
    }
    //нужно сохранить id для запроса удаления с базы
  }

  addJob() {

    this.user.jods.push({
      "id": 0, "job": this.job,
      "work_status": this.work_status,
      "from_year": this.from_year,
      "to_year": this.to_year==""? null:this.to_year,
      "about": this.about
    })

    this.job = "";
    this.work_status = "";
    this.from_year = "";
    this.to_year = "";
    this.about = "";
  }

}
