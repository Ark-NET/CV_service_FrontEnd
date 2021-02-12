export class User {
  public fullName: string;
  public login: string;
  public id: number;

  constructor(fullName: string, login: string, id: number) {
    this.fullName = fullName,
      this.login = login,
      this.id = id
  }
}
