import { Injectable } from '@angular/core';
import {roleResponsableStructure, springUrl} from "../../environments/environment";
import {ProfesseurModel} from "../components/professeur/ProfesseurModel";
import {HttpClient} from "@angular/common/http";
import {KeycloakSecurityService} from "./keycloak-security.service";
import {EquipeModel} from "../components/equipe/EquipeModel";
import {ProfesseurService} from "./professeur.service";

@Injectable({
  providedIn: 'root'
})
export class EquipeService {

  constructor(private httpClient:HttpClient,private kcService: KeycloakSecurityService, private professeurService: ProfesseurService) { }

  public allEquipes(){
    return this.httpClient.get(springUrl+"EQUIPE-RECH-SERVICE/equipe/all")
  }
  public getEquipe(id:number){
    return this.httpClient.get(springUrl+"EQUIPE-RECH-SERVICE/equipe/serchEquipe/"+id)
  }
  public getEquipeByNom(nom:string){
    return this.httpClient.get(springUrl+"EQUIPE-RECH-SERVICE/equipe/serchEquipeByNom/"+nom)
  }
  public save(equipe:EquipeModel){
    return this.httpClient.post(springUrl+"EQUIPE-RECH-SERVICE/equipe/add", equipe)
  }
  public update(equipe:EquipeModel){
    return this.httpClient.put(springUrl+"EQUIPE-RECH-SERVICE/equipe/update", equipe)
  }
  public delete(index:any){
    return this.httpClient.delete(springUrl+"EQUIPE-RECH-SERVICE/equipe/delete/"+index)
  }
  public getResponsable(id:number){
    return this.httpClient.get(springUrl+"EQUIPE-RECH-SERVICE/equipe/responsable/"+id)
  }
  public getMembres(id:number){
    return this.httpClient.get(springUrl+"EQUIPE-RECH-SERVICE/equipe/membres/"+id)
  }
  //keycloak service
  public async addRole(responsablEmail:any){
    let idResponsable;
    await this.professeurService.getProfByEmailKeycloak(responsablEmail).subscribe(async (res:any) =>{
      if(res){
        console.log(res)
        idResponsable = res[0].id
        console.log(idResponsable)
      }
    }, err => err)
    return this.httpClient.post("http://localhost:8080/auth/admin/realms/gestion_commande/users/"+ idResponsable +"/role-mappings/realm", roleResponsableStructure)
  }
}
