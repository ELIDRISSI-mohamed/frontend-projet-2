import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { springUrl } from 'src/environments/environment';
import { ProductModel } from '../components/products/ProductModel';
import { KeycloakSecurityService } from './keycloak-security.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient:HttpClient,private kcService: KeycloakSecurityService) { }

  // httpOptions = {
  //   headers : new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer '+this.kcService.kc.token
  //   }) 
  // } ====> on le remplacer par interceptor
  url = "http://localhost:8083/"
  public getProducts(){
    return this.httpClient.get(this.url+"/api/product/all")
  }
  public getProduct(libele:string): Observable<ProductModel>{
    return this.httpClient.get(this.url+"/api/product/"+libele)
  }
  public saveProduct(product:ProductModel){
    return this.httpClient.post(this.url+"/api/product/save", product)
  }
  public updateProduct(product:any){
    return this.httpClient.put(this.url+"/api/product/update", product)
  }
  public deleteProduct(index:any){
    return this.httpClient.delete(this.url+"/api/product/delete/"+index)
  }
}
