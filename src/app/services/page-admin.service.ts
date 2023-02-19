import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {springUrl} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PageAdminService {

  constructor(private httpClient: HttpClient) { }

  public allBudgets() {
    return this.httpClient.get(springUrl+"BUDGET-SERVICE/budgets").toPromise()
  }
  public allEquipes(){
    return this.httpClient.get(springUrl+"EQUIPE-RECH-SERVICE/equipe/all").toPromise()
  }
  public allLabos(){
    return this.httpClient.get(springUrl+"LABORATOIRE-RECH-SERVICE/labo/all").toPromise()
  }
  public allProduits(){
    return this.httpClient.get(springUrl+"PRODUIT-SERVICE/produit/all").toPromise()
  }
  public allProfs(){
    return this.httpClient.get(springUrl+"PROFESSEUR-SERVICE/professeur/all").toPromise()
  }
  public allProjets() {
    return this.httpClient.get(springUrl+"PROJET-RECH-SERVICE/projet/allProjet").toPromise()
  }
  public allRubriques() {
    return this.httpClient.get(springUrl+"RUBRIQUE-SERVICE/rubrique/all").toPromise()
  }
}
