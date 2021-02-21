export class User {

  id: number;
  full_name: string;
  login: string;
  password: string;
  email: string;
  phone: string;
  face: string;
  education: Array<any>;
  links: Array<any>;
  jobs: Array<any>;

  constructor() {

    this.id = -1;
    this.full_name = "";
    this.login = "";
    this.password = "";
    this.email = "";
    this.phone = "";
    this.face = "";
    this.education = [];
    this.links = [];
    this.jobs = [];
  }

  setTESTdata() {//тестовые данные

    this.id = 123;
    this.full_name = "Anton";
    this.login = "Tsminskyi";
    this.password = "1234567890";
    this.email = "test@email.com";
    this.phone = "123123123123";
    this.face = "";
    this.education = [{ "id": 1, "name": "Step1", "specialization": "full dev steck1", "from_year": "1991-01-01", "to_year": "2020-01-01", "about": "test" }, { "id": 2, "name": "Step", "specialization": "full dev steck", "from_year": "1993-01-01", "to_year": "2020-01-01", "about": "test" }]
    //this.links=[];
    this.links = [{ "id": 1, "name": "git", "link": "https://jhksdfjghsdfgjfd" }, { "id": 2, "name": "git2", "link": "https://jhksdfjghsdfgjfd" }]
    this.jobs = [{ "id": 1, "job": 'ServiseCAr', "work_status": 'Developer', "from_year": "2011-02-15", "to_year": null, "about": 'big DATABASE', "user_id": 1 }];
  }

  setAllUserData(
    id: number, full_name: string, login: string,
    password: string, email: string, phone: string,
    education: Array<any>, links: Array<any>, jods: Array<any>,
    face: string) {

    this.id = id;
    this.full_name = full_name;
    this.login = login;
    this.password = password;
    this.email = email;
    this.phone = phone;
    this.face = face
    this.education = education;
    this.links = links;
    this.jobs = jods;
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
