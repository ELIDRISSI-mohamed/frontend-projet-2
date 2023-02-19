import { DatePipe } from '@angular/common';
import { Injectable } from "@angular/core";
import {KeycloakSecurityService} from "../services/keycloak-security.service";

@Injectable()
export class Globals {
  date: any;

  constructor(private DatePipe: DatePipe, private kcService: KeycloakSecurityService) { }

  FormatDate(){
      this.date = new Date();
      return this.DatePipe.transform(this.date,"yyyy-MM-dd");
  }

  isAdmin() {
    return this.kcService.kc.hasRealmRole('ROLE_ADMIN')
  }
  isResponsable() {
    return this.kcService.kc.hasRealmRole('ROLE_RESPONSABLE_STRUCTURE')
  }
  isMembreStructure() {
    return this.kcService.kc.hasRealmRole('ROLE_MEMBRE_STRUCTURE')
  }
}
