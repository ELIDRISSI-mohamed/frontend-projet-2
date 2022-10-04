import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {KeycloakSecurityService} from "./keycloak-security.service";
import {RoleModel} from "../components/roles/RoleModel";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClient:HttpClient) { }

  public allRoles() {
    return this.httpClient.get("http://localhost:8080/auth/admin/realms/gestion_commande/roles")
  }
  public addRole(role:RoleModel) {
    return this.httpClient.post("http://localhost:8080/auth/admin/realms/gestion_commande/roles", role)
  }
  public updateRole(name:string, role:RoleModel) {
    return this.httpClient.put("http://localhost:8080/auth/admin/realms/gestion_commande/roles/"+name, role)
  }
  public deleteRole(name:string) {
    return this.httpClient.delete("http://localhost:8080/auth/admin/realms/gestion_commande/roles/"+name)
  }
}
