import {RubriqueModel} from "../rubrique/RubriqueModel";

export class ProfesseurKeycloak {

  public username?: string;
  public firstName?: string;
  public lastName?: string;
  public email?: string;
  public enabled?: boolean;
  public totp?: boolean;
  public emailVerified?: boolean;
  public credentials?: Array<object>;

  constructor(username?:string, firstName?:string, lastName?:string, email?:string) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.enabled = true;
    this.totp = false;
    this.emailVerified = true;
    this.credentials = [
      {
        "type": "password",
        "value": firstName + "_" + lastName,
        "temporary": true
      }
    ]
  }

}
