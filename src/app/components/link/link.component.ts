import { Component, Input, OnInit } from '@angular/core';
import { User } from "../../models/user"

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {

  @Input() user: User = new User();
  name: string = "";
  link: string = "";
  constructor() { }

  ngOnInit(): void {
  }

  addLink() {
    this.user.links.push({ "id": 0, "name": this.name, "link": this.link })
    this.name = "";
    this.link = "";
  }

  deleteLink(item: any) {
    var index = this.user.links.indexOf(item, 0);
    if (index > -1) {
      this.user.links.splice(index, 1);
    }
    //нужно сохранить id для запроса удаления с базы
  }

}
