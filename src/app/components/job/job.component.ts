import { Component, OnInit, Input } from '@angular/core';
import {User} from "../../models/user"

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  @Input() user: User = new User();
  constructor() { }

  ngOnInit(): void {
  }

}
