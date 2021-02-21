import { Component, Input, OnInit } from '@angular/core';
import { User } from "../../models/user"
import { ValidationService } from "../../services/validation.service"

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent {

  @Input() user = new User();
  errorMess = "";
  name = "";
  link = "";

  constructor(private validation: ValidationService) { }

  public addLink(): void {
    if (!this.validation.isEmpty(this.name) && !this.validation.isEmpty(this.link)) {
      this.user.links.push({ "id": 0, "name": this.name, "link": this.link })
      this.name = "";
      this.link = "";
      this.errorMess = "";
    }
    else {
      this.errorMess = "Fill in all fields to add a link";
    }
  }

  public deleteLink(item: any): void {
    var index = this.user.links.indexOf(item, 0);
    if (index > -1) {
      this.user.links.splice(index, 1);
    }
  }

}
