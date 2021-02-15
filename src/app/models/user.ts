import { Byte } from "@angular/compiler/src/util";

export class User {

  public id: number;
  public full_name: string;
  public login: string;
  public password: string;
  public email: string;
  public phone: string;
  public face?: Array<Byte>;
  public education: Array<any>;
  public links: Array<any>;
  public jods: Array<any>;

  constructor() {

    this.id = -1;
    this.full_name = "";
    this.login = "";
    this.password = "";
    this.email = "";
    this.phone = "";
    this.face = [];
    this.education = [];
    this.links = [];
    this.jods = [];
  }

  setTESTdata() {//тестовые данные

    this.id = 123;
    this.full_name = "Anton";
    this.login = "Tsminskyi";
    this.password = "1234567890";
    this.email = "test@email.com";
    this.phone = "123123123123";
    this.face = [];
    this.education = [{ "id": 1, "name": "Step", "specialization": "full dev steck", "from_year": '1991-01-01', "to_year": "2020-01-01", "about": "test" }]
    this.links = [{ "id": 1, "name": "git", "link": "https://jhksdfjghsdfgjfd" }]
    this.jods = [{ "id": 1, "job": 'ServiseCAr', "work_status": 'Developer', "from_year": "2011-02-15", "to_year": "2014-05-05", "about": 'big DATABASE', "user_id": 1 }];
  }

  setAllUserData(
    id: number, full_name: string, login: string,
    password: string, email: string, phone: string,
    education: Array<any>, links: Array<any>, jods: Array<any>,
    face?: Array<Byte>) {

    this.id = id;
    this.full_name = full_name;
    this.login = login;
    this.password = password;
    this.email = email;
    this.phone = phone;
    if(face!=null){

      this.face = face;
    }
    else this.face=face
    this.education = education;
    this.links = links;
    this.jods = jods;
  }

  setRegistartionUserData(
    full_name: string, login: string,
    password: string, email: string, phone: string) {

    this.full_name = full_name;
    this.login = login;
    this.password = password;
    this.email = email;
    this.phone = phone;
  }

}
