import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { springUrl } from 'src/environments/environment';
import { KeycloakSecurityService } from './keycloak-security.service';

@Injectable({
  providedIn: 'root'
})
export class FacutresService {

  url = "http://localhost:8088"
  constructor(private httpClient:HttpClient,private kcService: KeycloakSecurityService) { }

  public getAll(){
    return this.httpClient.get(this.url+"/api/bill/getAll")
  }
}
