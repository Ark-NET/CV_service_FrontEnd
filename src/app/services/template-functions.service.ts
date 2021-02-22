import { IUser } from "../models/Interface"

export function sortArry(arr: Array<any>) {
  arr = arr.sort((a, b) => a.from_year < b.from_year ? 1 : -1);
}

export function deleteItemArray(arr: Array<any>, id: number) {

  arr.slice(arr.indexOf(id), 1);
}

export function TEST(user: IUser) {// если переведу на интерфейс
  user.id = 123;
  user.full_name = "Anton";
  user.login = "Tsminskyi";
  user.password = "1234567890";
  user.email = "test@email.com";
  user.phone = "123123123123";
  user.face = "";
  user.education = [{ "id": 1, "name": "Step1", "specialization": "full dev steck1", "from_year": "1991-01-01", "to_year": "2020-01-01", "about": "test" }, { "id": 2, "name": "Step", "specialization": "full dev steck", "from_year": "1993-01-01", "to_year": "2020-01-01", "about": "test" }]
  //this.links=[];
  user.links = [{ "id": 1, "name": "git", "link": "https://jhksdfjghsdfgjfd" }, { "id": 2, "name": "git2", "link": "https://jhksdfjghsdfgjfd" }]
  user.jobs = [{ "id": 1, "job": 'ServiseCAr', "work_status": 'Developer', "from_year": "2011-02-15", "to_year": null, "about": 'big DATABASE', "user_id": 1 }];
}

