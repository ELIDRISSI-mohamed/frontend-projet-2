import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { springUrl } from 'src/environments/environment';
import { BillingModel } from '../components/customer/BillingModel';
import { ProductModel } from '../components/products/ProductModel';
import { KeycloakSecurityService } from './keycloak-security.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  url = "http://localhost:8082/"
  constructor(private httpClient:HttpClient,private kcService: KeycloakSecurityService) { }

  public saveInoice(billing:any){
    return this.httpClient.post(this.url+"/api/invoice/save", billing)
  }
}
