export interface IDisposalBasket {
  education: Array<any>;
  links: Array<any>;
  jobs: Array<any>;
}

export interface IUser { //возможно следующее место для рефакторинга

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
}
