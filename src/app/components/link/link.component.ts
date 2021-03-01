import { Component, Input } from '@angular/core';
import { User } from "../../models/user"
import { ValidationService } from "../../services/validation.service"
import { IDisposalBasket } from '../../models/Interface';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent {

  @Input() user = new User();
  @Input() basket: IDisposalBasket = {
    education: [],
    links: [],
    jobs: []
  };
  public errorMess = "";
  public errorMessItem = "";
  public name = "";
  public link = "";

  constructor(private validation: ValidationService) { }

  public addLink(): void {
    if (!this.validation.isEmpty(this.name) && !this.validation.isEmpty(this.link)) {
      this.user.links.push({ "id": 0, "name": this.name, "link": this.link });

      this.name = "";
      this.link = "";
      this.errorMess = "";
    }
    else {
      this.errorMess = "Field cannot be empty";
    }
  }

  public deleteLink(item: any): void {
    var index = this.user.links.indexOf(item, 0);
    if (index > -1) {
      this.user.links.splice(index, 1);
      this.basket.links.push(item.id);
    }
  }

  public checkValidation(id: string, item: string, classCss: string = "borderError"): void {
    if (this.validation.isEmpty(item)) {
      const nodeInput = document.getElementById(id)
      nodeInput?.classList.add(classCss);
      const errorNode = nodeInput?.parentNode?.parentNode;
      errorNode?.lastElementChild?.insertAdjacentHTML('afterbegin','<p>*The field cannot be empty</p>')
    }
    else {
      const nodeInput = document.getElementById(id)
      nodeInput?.classList.remove(classCss);
      nodeInput?.parentNode?.parentNode?.lastElementChild?.firstChild?.remove();
    }
  }

}
