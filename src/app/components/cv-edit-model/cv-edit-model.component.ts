import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service'
import { Router } from '@angular/router';
import { RequestDBService } from "../../services/httpClient";
import { User } from 'src/app/models/user';

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

  constructor(
    private storage: LocalStorageService,
    private router: Router,
    private request: RequestDBService,
  ) {
    this.returnImg = defaulteImg;
  }

  public ngOnInit(): void {
    //добавить сортировку масива
    this.loadUser();

    this.user.setTESTdata();

    if (this.user.face != "") {
      this.returnImg = this.user.face;
    }
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

  public onSelect(event: any) {
    this.onRemove(event);
    this.files.push(...event.addedFiles);

    this.readFile(this.files[0]).then(fileContents => {
      this.user.face = fileContents as string;
      this.returnImg = this.user.face;
    })
  }

  public onRemove(event: any) {
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

  public saveUser() {
    console.dir(this.user)
    this.request.userUPD(this.user).subscribe((data) => {

    },
      (err) => {
        console.log(err);
      });

  }

  public loguot() {
    const localUser = this.storage.getLocalStorage();

    if (localUser.rem == false) {
      this.storage.deleteLocalStorage();
    }
    this.router.navigate(["/loging"])
  }
}
