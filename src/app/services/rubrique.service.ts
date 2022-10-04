import { Injectable } from '@angular/core';
import {RoleModel} from "../components/roles/RoleModel";
import {HttpClient} from "@angular/common/http";
import {springUrl} from "../../environments/environment";
import {RubriqueModel} from "../components/rubrique/RubriqueModel";

@Injectable({
  providedIn: 'root'
})
export class RubriqueService {

  constructor(private httpClient: HttpClient) { }

  public allRubriques() {
    return this.httpClient.get(springUrl+"RUBRIQUE-RECH-SERVICE/rubrique/all")
  }
  public getRubrique(id:number) {
    return this.httpClient.get(springUrl+"RUBRIQUE-RECH-SERVICE/rubrique/rechercheById/"+id)
  }
  public addRubrique(rubrique:RubriqueModel) {
    return this.httpClient.post(springUrl+"RUBRIQUE-RECH-SERVICE/rubrique/add", rubrique)
  }
  public updateRubrique(rubrique:RubriqueModel) {
    return this.httpClient.put(springUrl+"RUBRIQUE-RECH-SERVICE/rubrique/update", rubrique)
  }
  public deleteRubrique(id:number) {
    return this.httpClient.delete(springUrl+"RUBRIQUE-RECH-SERVICE/rubrique/delete/"+ id)
  }
}
