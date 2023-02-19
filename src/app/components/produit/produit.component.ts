import { Component, OnInit } from '@angular/core';
import {Globals} from "../../utils/Globas";
import {Router} from "@angular/router";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {ProfesseurService} from "../../services/professeur.service";
import {KeycloakSecurityService} from "../../services/keycloak-security.service";
import {ProfesseurModel} from "../professeur/ProfesseurModel";
import {ProfesseurKeycloak} from "../professeur/ProfesseurKeycloak";
import {ProduitModel} from "./ProduitModel";
import {RubriqueService} from "../../services/rubrique.service";
import {ProduitService} from "../../services/produit.service";

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  hideFormError:Boolean = true
  hideFormOk:Boolean = true
  formMessage = ""
  search : any;
  produit = new ProduitModel();
  produits: any;
  rubriques: any;

  constructor(private globas: Globals,private rubriqueService: RubriqueService,private produitService: ProduitService, private router: Router, private ngxService: NgxUiLoaderService, public kcService : KeycloakSecurityService) {

  }

  ngOnInit(): void {
    if(this.kcService.kc.authenticated){
      if(!this.globas.isResponsable() && !this.globas.isAdmin())  this.router.navigate(['/error'])
      // all produit
      this.produitService.allProduits().subscribe(res=>{
        this.produits = res
        console.log(this.produits)
      }, error => error)
      // all rub
      this.rubriqueService.allRubriques().subscribe(res=>{
        this.rubriques = res
      }, error => error)
    } else{
      this.router.navigate(['/']);
    }
  }

  onSubmit(){
    console.log(this.produit)
    this.hideFormError = true;
    if(!this.produit.nom || !this.produit.description || !this.produit.rubrique || !this.produit.qte || !this.produit.prix) {
      this.hideFormError = false;
      this.formMessage = "Erreur remplissez tous les champs"
      return ;
    }
    this.ngxService.start();
    if(!this.produit.id) {
      this.produitService.addProduit(this.produit).subscribe(async res=>{
        if(res){
          this.hideFormOk = false
          this.formMessage = "BIEN AJOUTER"
        }
      },err =>{
        this.hideFormError = false
        this.formMessage = "ERREUR"
        console.log(err);
        return;
      })
    } else {
      console.log("Modification");
      this.produitService.updateProduit(this.produit).subscribe(res=>{
        if(res){
          this.hideFormOk = false
          this.formMessage = "BIEN"
        }
      },err =>{
        this.hideFormError = false
        this.formMessage = "ERREUR"
        console.log(err);
        return;
      })
    }
    this.produit = new ProduitModel();
    this.ngxService.stop();
  }

  onCancel() {
    this.produit = new ProduitModel();
  }

  onSelectProduit(p:ProduitModel) {
    this.produit = p;
  }

  onDeleteProduit(index:number) {
    console.log(this.produits[index])
    this.produitService.deleteProduit(this.produits[index].id)
      .subscribe(res=>{
      console.log(res)
      this.produits.splice(index, 1)
    }, error => error)
  }

  openDialogDelete(index:number) {
    if(confirm("Are you sure to delete "+this.produits[index].nom)) {
      this.onDeleteProduit(index)
    }
  } 
}
