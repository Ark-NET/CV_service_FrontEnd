import { Component, Input, OnInit } from '@angular/core';
import {User} from "../../models/user"

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {

  @Input() user: User = new User();
  constructor() { }

  ngOnInit(): void {
  }

}
