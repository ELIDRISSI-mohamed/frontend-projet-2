import { Injectable } from '@angular/core';
import { KeycloakInstance } from 'keycloak-js';
declare var Keycloak:any;

@Injectable({
  providedIn: 'root'
})
export class KeycloakSecurityService {
  public kc:any;
  constructor() { }

  public async init(){
    console.log("Init keycloak service")
    this.kc = new Keycloak({
      url:"http://localhost:8080/auth",
      realm:"my-project-realm",
      clientId:"factures-app"
    });
    await this.kc.init({
      //onLoad:'login-required'
      onLoad:"check-sso",
    });
    console.log(this.kc.token)
  }
}
