import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { springUrl } from 'src/environments/environment';
import { ProductModel } from '../components/products/ProductModel';
import { ProductQteModel } from '../components/products/ProductQteModel';
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

  public getProducts(){
    return this.httpClient.get(springUrl+"PRODUCT-SERVICE/api/product/all")
  }
  public getProduct(libele:string){
    return this.httpClient.get(springUrl+"PRODUCT-SERVICE/api/product/"+libele)
  }
  public saveProduct(product:ProductModel){
    return this.httpClient.post(springUrl+"PRODUCT-SERVICE/api/product/save", product)
  }
  public updateProduct(product:ProductModel){
    return this.httpClient.post(springUrl+"PRODUCT-SERVICE/api/product/update", product)
  }
  public updateProductQte(productQte:ProductQteModel){
    return this.httpClient.post(springUrl+"PRODUCT-SERVICE/api/product/updateQte", productQte)
  }
  public deleteProduct(index:any){
    return this.httpClient.delete(springUrl+"PRODUCT-SERVICE/api/product/delete/"+index)
  }
}
