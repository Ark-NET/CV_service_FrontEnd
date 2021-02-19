import { Component, Input, OnInit } from '@angular/core';
import { User } from "../../models/user"
import { ValidationService } from "../../services/validation.service"
import { DisposalBasket } from 'src/app/models/disposal-basket';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {

  @Input() user = new User();
  @Input() basket = new DisposalBasket();
  errorMess = "";
  name = "";
  link = "";

  constructor(private validation: ValidationService) { }

  ngOnInit(): void {
  }

  addLink() {
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

  deleteLink(item: any) {
    var index = this.user.links.indexOf(item, 0);
    if (index > -1) {
      this.user.links.splice(index, 1);
      if (item.id != 0) this.basket.links.push(item.id)
    }
  }

}
