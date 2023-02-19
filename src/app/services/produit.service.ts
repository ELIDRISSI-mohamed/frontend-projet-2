import { Injectable } from '@angular/core';
import {springUrl} from "../../environments/environment";
import {ProfesseurModel} from "../components/professeur/ProfesseurModel";
import {HttpClient} from "@angular/common/http";
import {ProduitModel} from "../components/produit/ProduitModel";

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private httpClient: HttpClient) { }

  public allProduits(){
    return this.httpClient.get(springUrl+"PRODUIT-SERVICE/produit/all")
  }
  public getProduit(id:number){
    return this.httpClient.get(springUrl+"PRODUIT-SERVICE/produit/getProduit/"+id)
  }
  public addProduit(produit:ProduitModel){
    return this.httpClient.post(springUrl+"PRODUIT-SERVICE/produit/add", produit)
  }
  public updateProduit(produit:ProduitModel){
    return this.httpClient.put(springUrl+"PRODUIT-SERVICE/produit/update", produit)
  }
  public deleteProduit(id:number){
    return this.httpClient.delete(springUrl+"PRODUIT-SERVICE/produit/delete/"+id)
  }
}
