import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { springUrl } from 'src/environments/environment';
import { KeycloakSecurityService } from './keycloak-security.service';


@Injectable({
  providedIn: 'root'
})
export class SupplierServiceService {

  constructor(private httpClient:HttpClient,private kcService: KeycloakSecurityService) { }

  // httpOptions = {
  //   headers : new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer '+this.kcService.kc.token
  //   }) 
  // } ====> on le remplacer par interceptor

  public getSuppliers(){
    return this.httpClient.get(springUrl+"suppliers")
  }
}
