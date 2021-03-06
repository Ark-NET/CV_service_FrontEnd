import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service'
import { Router } from '@angular/router';
import { RequestDBService } from "../../services/httpClient";
import { User } from 'src/app/models/user';
import { sortArry, deleteItemArray } from "../../services/template-functions.service";
import { IDisposalBasket } from '../../models/Interface';
import { ValidationService } from '../../services/validation.service';

const defaulteImg = "../../../assets/img/png-transparent-computer-icons-user-profile-priest-miscellaneous-avatar-user.png";

@Component({
  selector: 'app-cv-edit-model',
  templateUrl: './cv-edit-model.component.html',
  styleUrls: ['./cv-edit-model.component.scss']
})
export class CvEditModelComponent implements OnInit {
  public errorMess: Array<string> = ["the field cannot be empty"];
  public user = new User();
  public files: File[] = [];
  public returnImg = "";
  public basket: IDisposalBasket = {
    education: [],
    links: [],
    jobs: []
  };

  constructor(
    private storage: LocalStorageService,
    private router: Router,
    private request: RequestDBService,
    private validation: ValidationService
  ) {
    this.returnImg = defaulteImg;
  }

  public ngOnInit(): void {
    this.loadUser();
  }
  private cutTime(arr: Array<any>, reg: RegExp): void {

    arr.forEach(elem => {

      elem.from_year = elem.from_year.replace(reg, "");

      if (elem.to_year != null) {
        elem.to_year = elem.to_year.replace(reg, "");
      }

    })
  }

  private loadUser(): void {
    const localUser = this.storage.getLocalStorage();
    if (localUser != null) {

      this.request.userGET(localUser.id).subscribe((data) => {
        if (data) {

          this.user.setAllUserData(
            data.id, data.full_name, data.position, data.login,
            data.password, data.email, data.phone,
            data.education, data.links, data.jobs,
            data.face);

          this.cutTime(this.user.education, /T.+Z/)
          this.cutTime(this.user.jobs, /T.+Z/)

          if (this.user.face != null && this.user.face != "") {
            this.returnImg = this.user.face;
          }

          sortArry(this.user.education);

        }
      },
        (err) => {
          console.log(err);
        }
      )
    }
    else this.router.navigate(["/loging"])
  };

  public onSelect(event: any): void {
    this.onRemove(event);
    this.files.push(...event.addedFiles);

    this.readFile(this.files[0]).then(fileContents => {
      this.returnImg = fileContents as string;;
    })
  }

  public onRemove(event: any): void {
    this.files.splice(this.files.indexOf(event), 1);
    this.returnImg = defaulteImg;
  }


  private readFile(file: File): Promise<string | ArrayBuffer> {
    return new Promise<string | ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = e => {
        return resolve((e.target as FileReader).result as ArrayBuffer);
      };

      reader.onerror = e => {
        console.error(`FileReader failed on file ${file.name}.`);
        return reject(null);
      };

      if (!file) {
        console.error('No file to read.');
        return reject(null);
      }

      reader.readAsDataURL(file);
    });
  }

  public saveUser(): void {

    if (this.validationUser()) {
      console.dir(this.user)

      const action = new Promise((resolve, reject) => {

        if (this.files.length > 0) {

          var fd = new FormData();
          fd.append("image", this.files[0]);

          this.request.uploadIMG(fd).subscribe((data) => {
            this.user.face = data.data.link;
            resolve("pass");
          }, (err) => {
            console.dir(err);
            reject(err);
          })
        }
        else {
          resolve("pass");
        }
      })

      action.then(
        (value) => {
          this.request.userUPD(this.user).subscribe((data) => {
            this.clearBasket();

          },
            (err) => {
              console.log(err);
            });
        }
      )
    }
  }

  public loguot(): void {
    const localUser = this.storage.getLocalStorage();

    if (localUser.rem == false) {
      this.storage.deleteLocalStorage();
    }
    this.router.navigate(["/loging"])
  }


  private clearBasket(): void {

    this.basket.education.forEach(element => {

      this.request.deleteData_education(element).subscribe((data) => {

        deleteItemArray(this.basket.education, element)
      },
        (err) => { console.log(err) })

    });

    this.basket.jobs.forEach(element => {

      this.request.deleteData_job(element).subscribe((data) => {
        deleteItemArray(this.basket.jobs, element)
      }, (err) => { console.log(err) })

    });

    this.basket.links.forEach(element => {

      this.request.deleteData_link(element).subscribe((data) => {
        deleteItemArray(this.basket.links, element)
      }, (err) => { console.log(err) })

    });

  }

  private validationUser(): boolean {
    const arrValidationFilde: Array<boolean> = new Array();

    arrValidationFilde.push(this.validation.isEmpty(this.user.email));
    arrValidationFilde.push(this.validation.isEmpty(this.user.full_name));
    arrValidationFilde.push(this.validation.isEmpty(this.user.phone));

    this.user.links.forEach(element => {
      arrValidationFilde.push(this.validation.isEmpty(element.name));
      arrValidationFilde.push(this.validation.isEmpty(element.link));
    });

    this.user.education.forEach(element => {
      arrValidationFilde.push(this.validation.isEmpty(element.name));
      arrValidationFilde.push(this.validation.isEmpty(element.specialization));
      arrValidationFilde.push(this.validation.isEmpty(element.from_year));
      arrValidationFilde.push(this.validation.startDateIsGreater(element.from_year, element.to_year));
    });

    this.user.jobs.forEach(element => {
      arrValidationFilde.push(this.validation.isEmpty(element.work_status));
      arrValidationFilde.push(this.validation.isEmpty(element.job));
      arrValidationFilde.push(this.validation.isEmpty(element.from_year));
      arrValidationFilde.push(this.validation.startDateIsGreater(element.from_year, element.to_year));
    });

    return arrValidationFilde.indexOf(true) >= 0 ? false : true;
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
