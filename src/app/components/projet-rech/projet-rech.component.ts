import { Component, OnInit } from '@angular/core';
import {ProjetRechModel} from "./ProjetRechModel";
import {KeycloakSecurityService} from "../../services/keycloak-security.service";
import {ProfesseurService} from "../../services/professeur.service";
import {ProjetRechService} from "../../services/projet-rech.service";
import {Route, Router} from "@angular/router";
import {EquipeModel} from "../equipe/EquipeModel";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-projet-rech',
  templateUrl: './projet-rech.component.html',
  styleUrls: ['./projet-rech.component.css']
})
export class ProjetRechComponent implements OnInit {
  hideFormError:Boolean = true
  hideFormOk:Boolean = true
  search: any;
  formMessage: any;
  profsUsername:any;
  projet = new ProjetRechModel();
  membresSelected: any;
  profs:any;
  projets:any;
  projetIndex:any;
  membresProjet:any;

  dropdownSettings = {
    idField: 'id',
    textField: 'username',
    selectAllText: 'Select All Items From List',
    unSelectAllText: "UnSelect All Items From List",
  };

  constructor(private modalService: NgbModal, private ngxService: NgxUiLoaderService, private router: Router,public kcService: KeycloakSecurityService, private professeurService: ProfesseurService, private projetRechService: ProjetRechService) {
  }

  ngOnInit(): void {
    if(this.kcService.kc.authenticated){
      if(!this.isAdmin())  this.router.navigate(['/error'])
      this.professeurService.getProfs()
        .subscribe(async res=>{
          this.profs = res;
        },err =>{
          console.log(err);
          this.hideFormError = false
          this.formMessage = "ERREUR"
          return;
        })
      //Get all username
      this.professeurService.getUsernameProfs()
        .subscribe(async res=>{
          this.profsUsername = res;
        },err =>{
          console.log(err);
          this.hideFormError = false
          this.formMessage = "ERREUR"
          return;
        })
      //Get all projet
      this.projetRechService.all()
        .subscribe(async res=>{
          this.projets = res;
        },err =>{
          this.hideFormError = false
          this.formMessage = "ERREUR"
          console.log(err);
          return;
        })
    } else{
      this.router.navigate(['/']);
    }
  }

  openXl(content:any, index:any) {
    this.modalService.open(content, { size: 'xl' });
    this.projetIndex = index
    this.projetRechService.getMembres(this.projets[index].id)
      .subscribe(res=>{
        this.membresProjet = res
      }, error => error)
  }

  async onSubmit() {
    this.projet.membres = this.membresSelected
    this.hideFormError = true;
    if(!this.projet.nom || !this.projet.membres || !this.projet.responsable) {
      this.hideFormError = false;
      this.formMessage = "Erreur remplissez tous les champs"
      return ;
    }
    this.ngxService.start();
    if(!this.projet.id) {
      console.log("save")
      //Scope for save
      this.projetRechService.save(this.projet).subscribe(async res=>{
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
      console.log("update")
      //Scope for update
      this.projetRechService.update(this.projet).subscribe(res=>{
        if(res){
          this.hideFormOk = false
          this.formMessage = "BIEN"
        }
      },err =>{
        console.log(err);
      })
    }
    this.projet = new ProjetRechModel();
    this.membresSelected = []
    this.ngxService.stop();
  }

  onCancel(){
    this.projet = new ProjetRechModel();
    this.membresSelected = [];
  }

  onItemSelect() {
    console.log(this.membresSelected)
  }
  onItemDeSelect() {
    console.log(this.membresSelected)
  }
  onSelectAll() {
    console.log(this.membresSelected)
  }
  onUnSelectAll() {
    console.log(this.membresSelected)
  }

  isAdmin(){
    return this.kcService.kc.hasRealmRole('ROLE_ADMIN')
  }

  onDelete(index:any) {
    console.log(index)
    this.projetRechService.delete(this.projets[index].id).subscribe(res=>{
      console.log(res)
      this.projets.splice(index, 1)
    }, error => error)
  }

  onEdit(projet:any) {
    this.projet = projet
    this.membresSelected = projet.membres
  }

  onEditMembres() {
    this.projet = this.projets[this.projetIndex]
    this.membresSelected = this.projets[this.projetIndex].membres
  }

  onDeleteMembre(indexMember:any) {
    console.log("on delete member ", indexMember)
    let index=-1
    this.projets[this.projetIndex].membres.find((member:any, i:any)=>{
      if(member.id === this.membresProjet[indexMember].id) {
        index=i
        this.projets[this.projetIndex].membres.splice(index,1)
        this.membresProjet.splice(indexMember, 1)
      }
    });
    this.projetRechService.update(this.projets[this.projetIndex])
      .subscribe(res=>{
        console.log(res)
      }, error => error)
  }
}
