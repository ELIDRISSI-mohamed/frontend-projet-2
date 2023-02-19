import { Injectable } from '@angular/core';
import { KeycloakSecurityService } from './keycloak-security.service';
import {HttpClient} from "@angular/common/http";
import { springUrl } from 'src/environments/environment';
import { CommandeModel } from '../components/commande/CommandeModel';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  constructor(private httpClient:HttpClient,private kcService: KeycloakSecurityService) { }

  public save(commande:CommandeModel){
    return this.httpClient.post(springUrl+"COMMANDE-SERVICE/commande", commande)
  }
  public all(){
    return this.httpClient.get(springUrl+"COMMANDE-SERVICE/commande")
  }
  
}
