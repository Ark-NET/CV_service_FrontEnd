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
  errorMess = "";
  user = new User();
  files: File[] = [];
  returnImg = "";
  basket: IDisposalBasket = {
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

    this.user.setTESTdata();

    if (this.user.face != "") {
      this.returnImg = this.user.face;
    }

    sortArry(this.user.education);
  }

  private loadUser(): void {

    const localUser = this.storage.getLocalStorage();
    if (localUser != null) {

      this.request.userGET(localUser.id).subscribe((data) => {
        if (data) {

          this.user.setAllUserData(
            data.id, data.full_name, data.login,
            data.password, data.email, data.phone,
            data.education, data.links, data.jods,
            data.face);
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
    console.dir(this.user)
    console.dir(this.basket)
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


  private clearBasket():void {

    this.basket.education.forEach(element => {

      this.request.deleteData_education(element.id).subscribe((data) => {
        deleteItemArray(this.basket.education, element.id)
      },
        (err) => { console.log(err) })

    });

    this.basket.jobs.forEach(element => {

      this.request.deleteData_job(element.id).subscribe((data) => {
        deleteItemArray(this.basket.jobs, element.id)
      }, (err) => { console.log(err) })

    });

    this.basket.links.forEach(element => {

      this.request.deleteData_link(element.id).subscribe((data) => {
        deleteItemArray(this.basket.links, element.id)
      }, (err) => { console.log(err) })

    });

  }
}
