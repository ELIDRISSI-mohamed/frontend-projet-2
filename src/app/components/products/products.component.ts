import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { isNullOrUndefined } from 'util';

import { ProductModel } from './ProductModel';
import { ProductsService } from 'src/app/services/products.service';
import { KeycloakSecurityService } from 'src/app/services/keycloak-security.service';
import { Globals } from 'src/app/utils/Globas';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  hideFormError:Boolean = true
  hideFormOk:Boolean = true
  formMessage = ""
  products: any;
  search : any;
  date : any = new Date();
  p = new ProductModel();

  constructor(private globals: Globals, private router: Router, private datePipe: DatePipe, private ngxService: NgxUiLoaderService, private productsService: ProductsService, public kcService : KeycloakSecurityService) {

  }

  ngOnInit(): void {
    if(this.kcService.kc.authenticated){
      if(!this.isProudctManager())  this.router.navigate(['/error'])
     
      this.productsService.getProducts()
        .subscribe(async res=>{
          this.products = res;
        },err =>{
          console.log(err);
        })
    } else{
      this.router.navigate(['/']);    
    }

  }

  onSubmit(){
    this.hideFormError = true;
    if(!this.p.libele || !this.p.prix || !this.p.qte || !this.p.description) {
      this.hideFormError = false;
      this.formMessage = "Erreur remplissez tout les champs"
      return ;
    }
    this.ngxService.start();
    if(!this.p.id) {
      console.log("Operation pour l'ajout");
      this.p.date =  this.globals.FormatDate();
      console.log(this.p)
      this.productsService.saveProduct(this.p).subscribe(res=>{
        if(res){
          this.hideFormOk = false
          this.formMessage = "Bien modifié"
        }
      },err =>{
        console.log(err);
      })
      window.location.reload();
    }else {
      console.log("Modification");
      this.productsService.updateProduct(this.p).subscribe(res=>{
        if(res){
          this.hideFormOk = false
          this.formMessage = "Bien modifié"
        }
      },err =>{
        console.log(err);
      })
    }
    this.p = new ProductModel();
    this.ngxService.stop();
  }
  onCancel(){
    this.p = new ProductModel();
  }
  onSelectProduit(product:any){
    this.p=product
  }
  onDeleteProduit(index:any){
    console.log("delete");
    this.ngxService.start();
    this.productsService.deleteProduct(this.products[index].id).subscribe(res=>{
      console.log(res)
    },err =>{
      console.log(err);
    })
    if (index !== -1) {
      this.products.splice(index, 1);
    } 
    this.ngxService.stop();
  }
  isProudctManager(){
    return this.kcService.kc.hasRealmRole('ROLE_PRODUCT_MANAGER')
  }
}
