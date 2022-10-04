import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProjetRechModel} from "../components/projet-rech/ProjetRechModel";
import {springUrl} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProjetRechService {

  constructor(private httpClient:HttpClient) { }

  public all() {
    return this.httpClient.get(springUrl+"PROJET-RECH-SERVICE/projet/allProjet")
  }
  public getMembres(id:number) {
    return this.httpClient.get(springUrl+"PROJET-RECH-SERVICE/projet/membres/"+id)
  }
  public save(projet: ProjetRechModel) {
    return this.httpClient.post(springUrl+"PROJET-RECH-SERVICE/projet/add", projet)
  }
  public update(projet: ProjetRechModel) {
    return this.httpClient.put(springUrl+"PROJET-RECH-SERVICE/projet/update", projet)
  }
  public delete(id: number) {
    return this.httpClient.delete(springUrl+"PROJET-RECH-SERVICE/projet/delete/"+ id)
  }
}
