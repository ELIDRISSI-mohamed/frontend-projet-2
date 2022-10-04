import { Component, OnInit } from '@angular/core';
import {Globals} from "../../utils/Globas";
import {Router} from "@angular/router";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {KeycloakSecurityService} from "../../services/keycloak-security.service";
import {ProfesseurModel} from "./ProfesseurModel";
import {ProfesseurService} from "../../services/professeur.service";
import {ProfesseurKeycloak} from "./ProfesseurKeycloak";

@Component({
  selector: 'app-professeur',
  templateUrl: './professeur.component.html',
  styleUrls: ['./professeur.component.css']
})
export class ProfesseurComponent implements OnInit {

  hideFormError:Boolean = true
  hideFormOk:Boolean = true
  formMessage = ""
  profs: any;
  profsKeycloak: any;
  search : any;
  date : any = new Date();
  p = new ProfesseurModel();
  profKey = new ProfesseurKeycloak();

  constructor(private globals: Globals, private router: Router, private ngxService: NgxUiLoaderService, private professeurService: ProfesseurService, public kcService : KeycloakSecurityService) {

  }

  ngOnInit(): void {
    if(this.kcService.kc.authenticated){
      if(!this.isAdmin())  this.router.navigate(['/error'])

      this.professeurService.getProfs()
        .subscribe(async res=>{
          this.profs = res;
        },err =>{
          console.log(err);
        })
      // get all profs from keycloak
      this.professeurService.getProfsKeycloak()
        .subscribe(async res=>{
          this.profsKeycloak = res;
        },err =>{
          console.log(err);
        })
    } else{
      this.router.navigate(['/']);
    }

  }

  onSubmit(){
    this.hideFormError = true;
    if(!this.p.nom || !this.p.prenom || !this.p.mail) {
      this.hideFormError = false;
      this.formMessage = "Erreur remplissez tout les champs"
      return ;
    }
    this.ngxService.start();
    if(!this.p.id) {
      this.profKey =
          new ProfesseurKeycloak(this.p.nom+"_"+this.p.prenom, this.p.prenom, this.p.nom, this.p.mail);
      this.professeurService.saveProf(this.p).subscribe(async res=>{
        if(res){
          this.hideFormOk = false
          this.formMessage = "BIEN AJOUTER"
          // Add to keycloak
          await this.professeurService.saveProfKeycloak(this.profKey).subscribe(res=>{
        }, err=> {
            console.log(err)
            return;
        })
      }
    },err =>{
      this.hideFormError = false
      this.formMessage = "ERREUR"
      console.log(err);
      return;
    })
    } else {
      console.log("Modification");
      this.professeurService.updateProf(this.p).subscribe(res=>{
        if(res){
          this.hideFormOk = false
          this.formMessage = "BIEN"
        }
      },err =>{
        console.log(err);
      })
    }
    this.p = new ProfesseurModel();
    this.ngxService.stop();
  }

  onCancel(){
    this.p = new ProfesseurModel();
  }

  onSelectProf(prof:any){
    this.p=prof
  }

  onDeleteProf(index:any){
    console.log("delete");
    const result = this.profsKeycloak.map((pr:any) => {
      if(pr.email==this.profs[index].mail) return pr;
    });
    this.professeurService.deleteProfKeycloak(result[1].id).subscribe(res=>{
      this.professeurService.deleteProf(this.profs[index].id).subscribe(res=>{
        this.profs.splice(index, 1);
      }, err => err)
    }, err => err)
    /*this.ngxService.start();
    this.professeurService.deleteProf(this.profs[index].id).subscribe(async res=>{
      const result = await this.profsKeycloak.map((pr:any) => {
        if(pr.email==this.profs[index].mail) return pr;
      });
      console.log(result[0])
    },err =>{
      console.log(err);
    })
    if (index !== -1) {
      this.profs.splice(index, 1);
    }
    this.ngxService.stop();*/
    this.ngxService.stop();
  }
  /*onDeleteProduit(index:any){
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
  }*/
  isAdmin(){
    console.log(this.kcService.kc.hasRealmRole('ROLE_ADMIN'))
    return this.kcService.kc.hasRealmRole('ROLE_ADMIN')
  }
}
