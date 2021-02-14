export class User {

  public id: number;
  public email: string;
  public password: string;
  public education: Array<any>;
  public links: Array<any>;
  public jods: Array<any>;

  constructor() {

    this.id = -1,
      this.email = "",
      this.password = "",
      this.education = [],
      this.links = [],
      this.jods = []
  }
}
