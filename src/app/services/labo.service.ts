import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {KeycloakSecurityService} from "./keycloak-security.service";
import {springUrl} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LaboService {

  constructor(private httpClient:HttpClient,private kcService: KeycloakSecurityService) { }

  public addLabo(labo:any){
    return this.httpClient.post(springUrl+"LABORATOIRE-RECH-SERVICE/labo/add", labo)
  }
  public getAll(){
    return this.httpClient.get(springUrl+"LABORATOIRE-RECH-SERVICE/labo/all")
  }
  public serchLaboById(id:number){
    return this.httpClient.get(springUrl+"LABORATOIRE-RECH-SERVICE/labo/laboById/"+id)
  }
  public serchLaboByIntitule(intitule:string){
    return this.httpClient.get(springUrl+"LABORATOIRE-RECH-SERVICE/labo/laboByIntitule/"+intitule)
  }
  public updateLabo(labo:any){
    return this.httpClient.put(springUrl+"LABORATOIRE-RECH-SERVICE/labo/update", labo)
  }
  public deleteLabo(id:number){
    return this.httpClient.delete(springUrl+"LABORATOIRE-RECH-SERVICE/labo/delete/"+ id)
  }
  public getMembres(id:number){
    return this.httpClient.get(springUrl+"LABORATOIRE-RECH-SERVICE/labo/membres/"+ id)
  }
  public getEquipe(id:number){
    return this.httpClient.get(springUrl+"LABORATOIRE-RECH-SERVICE/labo/equipes/"+ id)
  }
  public getResponsable(id:number){
    return this.httpClient.get(springUrl+"LABORATOIRE-RECH-SERVICE/labo/responsable/"+ id)
  }
}
