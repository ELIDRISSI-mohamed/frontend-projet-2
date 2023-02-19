import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {KeycloakSecurityService} from "./keycloak-security.service";
import {roleProf, springUrl} from "../../environments/environment";
import {ProfesseurModel} from "../components/professeur/ProfesseurModel";
import {ProfesseurKeycloak} from "../components/professeur/ProfesseurKeycloak";

@Injectable({
  providedIn: 'root'
})
export class ProfesseurService {
  constructor(private httpClient:HttpClient,private kcService: KeycloakSecurityService) { }

  // httpOptions = {
  //   headers : new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer '+this.kcService.kc.token
  //   })
  // } ====> on le remplacer par interceptor

  public getProfs(){
    return this.httpClient.get(springUrl+"PROFESSEUR-SERVICE/professeur/all")
  }
  public getUsernameProfs(){
    return this.httpClient.get(springUrl+"PROFESSEUR-SERVICE/professeur/getUsernameProfs")
  }
  public getProf(id:string){
    return this.httpClient.get(springUrl+"PROFESSEUR-SERVICE/professeur/getProfesseurById/"+id)
  }
  public saveProf(prof:ProfesseurModel){
    return this.httpClient.post(springUrl+"PROFESSEUR-SERVICE/professeur/save", prof)
  }
  public updateProf(prof:ProfesseurModel){
    return this.httpClient.put(springUrl+"PROFESSEUR-SERVICE/professeur/update", prof)
  }
  public deleteProf(index:any){
    return this.httpClient.delete(springUrl+"PROFESSEUR-SERVICE/professeur/delete/"+index)
  }
  
  //keycloak service
  public async addRole(emailProf:any){
    //const res:any = await this.httpClient.get("http://localhost:8080/auth/admin/realms/gestion_commande/users?email="+emailProf).toPromise(); 
    const res:any = await this.getProfByEmailKeycloak(emailProf);   
    return this.httpClient.post("http://localhost:8080/auth/admin/realms/gestion_commande/users/"+res[0].id+"/role-mappings/realm", [{
      "id":"7abeb814-9bc8-4037-a91e-7fbd3e4f7043",
      "name":"ROLE_PROF"}]).toPromise();
  }
  //keycloak api
  public getProfsKeycloak(){
    return this.httpClient.get("http://localhost:8080/auth/admin/realms/gestion_commande/users")
  }
  public getProfByEmailKeycloak(email:any){
    return this.httpClient.get("http://localhost:8080/auth/admin/realms/gestion_commande/users?email="+email).toPromise();
  }
  public saveProfKeycloak(prof:ProfesseurKeycloak){
    return this.httpClient.post("http://localhost:8080/auth/admin/realms/gestion_commande/users", prof)
  }
  public deleteProfKeycloak(index:any){
    return this.httpClient.delete("http://localhost:8080/auth/admin/realms/gestion_commande/users/"+index)
  }
}
