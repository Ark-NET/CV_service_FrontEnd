import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service'
import { Router } from '@angular/router';
import { RequestDBService } from "../../services/httpClient";
import { User } from 'src/app/models/user';
import { sortArry, deleteItemArray } from "../../services/template-functions.service";
import { IDisposalBasket } from '../../models/Interface'

const defaulteImg = "../../../assets/img/png-transparent-computer-icons-user-profile-priest-miscellaneous-avatar-user.png"

@Component({
  selector: 'app-cv-edit-model',
  templateUrl: './cv-edit-model.component.html',
  styleUrls: ['./cv-edit-model.component.scss']
})
export class CvEditModelComponent implements OnInit {
  private errorMess = "";
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
  ) {
    this.returnImg = defaulteImg;
  }

  public ngOnInit(): void {
    this.loadUser();

    // this.user.setTESTdata();
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

          if (this.user.face != null) {
            this.returnImg = this.user.face;
          }
console.dir(this.user);
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
      this.user.face = fileContents as string;
      this.returnImg = this.user.face;
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
    this.request.userUPD(this.user).subscribe((data) => {
      this.clearBasket();
    },
      (err) => {
        console.log(err);
      });
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
}
