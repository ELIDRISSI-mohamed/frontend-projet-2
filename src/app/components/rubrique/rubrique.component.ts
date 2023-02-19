import { Component, OnInit } from '@angular/core';
import {RoleModel} from "../roles/RoleModel";
import {KeycloakSecurityService} from "../../services/keycloak-security.service";
import {Router} from "@angular/router";
import {RubriqueService} from "../../services/rubrique.service";
import {RubriqueModel} from "./RubriqueModel";
import {NgxUiLoaderService} from "ngx-ui-loader";

@Component({
  selector: 'app-rubrique',
  templateUrl: './rubrique.component.html',
  styleUrls: ['./rubrique.component.css']
})
export class RubriqueComponent implements OnInit {
  hideFormError:Boolean = true
  hideFormOk:Boolean = true
  search: any;
  roleAncienName:any;
  formMessage = ""
  rubrique = new RubriqueModel();
  rubriques: any;

  constructor(private ngxService:NgxUiLoaderService, public kcService: KeycloakSecurityService, private router: Router, private rubriqueService:RubriqueService) { }

  ngOnInit(): void {
    if(this.kcService.kc.authenticated){
      if(!this.isAdmin())  this.router.navigate(['/error'])
      this.rubriqueService.allRubriques().subscribe(res=>{
        this.rubriques = res
        console.log(this.rubriques)
      }, error => error)
    } else{
      this.router.navigate(['/']);
    }
  }

  isAdmin() {
    return this.kcService.kc.hasRealmRole('ROLE_ADMIN')
  }

  onSubmit() {
    console.log(this.rubrique)
    this.hideFormError = true;
    if(!this.rubrique.nom ) {
      this.hideFormError = false;
      this.formMessage = "Erreur remplissez tous les champs"
      return ;
    }
    this.ngxService.start();
    if(!this.rubrique.id) {
      console.log("add")
      this.rubriqueService.addRubrique(this.rubrique).subscribe(res =>{
        if(res) {
          console.log(res)
          this.hideFormOk = false
          this.formMessage = "BIEN AJOUTER"
          this.rubrique = new RubriqueModel()
        }
      }, error => error)
    } else {
      console.log("update")
      this.rubriqueService.updateRubrique(this.rubrique).subscribe(res =>{
        console.log(res)
        this.hideFormOk = false
        this.formMessage = "BIEN MODIFIER"
        this.rubrique = new RubriqueModel()
      }, error => error)
    }
    this.ngxService.stop();
  }

  onCancel() {
    this.rubrique = new RubriqueModel();
  }

  onDelete(index: any) {
    this.ngxService.start();
    this.rubriqueService.deleteRubrique(this.rubriques[index].id).subscribe(res=>{
      console.log(res)
      this.rubriques.splice(index, 1)
    }, err => err)

    this.ngxService.stop();

  }

  onEdit(rub: any) {
    this.rubrique = rub
  }
  
  openDialogDelete(index:number) {
    if(confirm("Are you sure to delete "+this.rubriques[index].nom)) {
      this.onDelete(index)
    }
  } 
}
