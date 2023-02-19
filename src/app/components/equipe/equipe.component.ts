import {Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {NgbModule, ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';


import {ProfesseurModel} from "../professeur/ProfesseurModel";
import {Globals} from "../../utils/Globas";
import {Router} from "@angular/router";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {ProfesseurService} from "../../services/professeur.service";
import {KeycloakSecurityService} from "../../services/keycloak-security.service";
import {EquipeModel} from "./EquipeModel";
import {EquipeService} from "../../services/equipe.service";

import { IDropdownSettings, } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.css']
})
export class EquipeComponent implements OnInit {


  hideFormError:Boolean = true
  hideFormOk:Boolean = true
  formMessage = ""
  profs: any;
  profsUsername: any;
  selectedProfs:any
  username: any;
  equipes: any;
  equipeIndex: any;
  membresEquipe: any;
  search : any;
  equipe = new EquipeModel();
  responsable = new ProfesseurModel();
  membres: any;

  dropdownSettings:any;

  constructor(private globas: Globals,private modalService: NgbModal, private globals: Globals, private router: Router, private ngxService: NgxUiLoaderService, private equipeService: EquipeService, private professeurService: ProfesseurService, public kcService : KeycloakSecurityService) {
  }


  openXl(content:any, index:any) {
    this.modalService.open(content, { size: 'xl' });
    this.equipeIndex = index
    this.equipeService.getMembres(this.equipes[index].id)
      .subscribe(res=>{
        this.membresEquipe = res
      }, error => error)
  }

  ngOnInit(): void {
    this.dropdownSettings = {
      idField: 'id',
      textField: 'username',
      selectAllText: 'Select All Items From List',
      unSelectAllText: "UnSelect All Items From List",
    };

    if(this.kcService.kc.authenticated){
      if(!this.globals.isAdmin())  this.router.navigate(['/error'])
      this.professeurService.getProfs()
        .subscribe(res=>{
          this.profs = res;
        },err =>{
          console.log(err);
        })
      //Get all equipes
      this.equipeService.allEquipes()
        .subscribe(res=>{
          this.equipes = res;
          console.log(res)
        },err =>{
          console.log(err);
        })
      //Get all username
      this.professeurService.getUsernameProfs()
        .subscribe(res=>{
          this.profsUsername = res;
        },err =>{
          console.log(err);
        })
    } else{
      this.router.navigate(['/']);
    }
  }

  async onSubmit() {
    this.equipe.membres = this.selectedProfs
    this.hideFormError = true;
    this.hideFormOk = true;
    if(!this.equipe.nom || !this.equipe.responsable || !this.equipe.membres || !this.equipe.acronyme) {
      this.hideFormError = false;
      this.formMessage = "Erreur remplissez tout les champs"
      return ;
    }
    this.ngxService.start();
    if(!this.equipe.id) {
      //Scope for save
      this.equipeService.save(this.equipe).subscribe(async res=>{
        if(res){
          this.hideFormOk = false
          this.formMessage = "BIEN AJOUTER"
          //associe le role responsable a le prof
          this.equipeService.addRole(this.equipe.responsable?.mail).then(res=>{
            res.subscribe(data=> data, err=> {
              console.log(err)
            })
          }).catch(err => {
            console.log(err)
          })
          this.equipe = new EquipeModel();
        }
      },err =>{
        this.hideFormError = false
        this.formMessage = "ERROR FORM"
        return;
      })
    } else {
      //Scope for update
      this.equipeService.update(this.equipe).subscribe(async res=>{
        if(res){
          this.hideFormOk = false
          this.formMessage = "BIEN"
          this.equipe = new EquipeModel();
        }
      },err =>{
        this.hideFormError = false
        this.formMessage = "ERROR FORM"
        return;
      })
    }
    this.selectedProfs = []
    this.ngxService.stop();
  }

  onCancel(){
    console.log(this.selectedProfs)
    this.equipe = new EquipeModel();
    this.membres = [];
  }

  onDeleteEuipe(index:any){
    this.ngxService.start();
    this.equipeService.delete(this.equipes[index].id).subscribe(res=>{
      console.log(res)
      this.equipes.splice(index, 1)
    }, err => err)

    this.ngxService.stop();
  }

  onEdit(equipe:any) {
    this.equipe = equipe
    this.selectedProfs = equipe.membres
  }

  onEditMembres(){
    this.equipe = this.equipes[this.equipeIndex]
    this.selectedProfs = this.equipes[this.equipeIndex].membres
  }

  onItemSelect() {
    console.log(this.selectedProfs)
  }
  onItemDeSelect() {
    console.log(this.selectedProfs)
  }
  onSelectAll() {
    console.log(this.selectedProfs)
  }
  onUnSelectAll() {
    console.log(this.selectedProfs)
  }

  onDeleteMembre(membreIndex:number) {
    let index=-1
    this.equipes[this.equipeIndex].membres.map((membre:any, i:any)=>{
      if(membre.id === this.membresEquipe[membreIndex].id) {
        index=i
        this.equipes[this.equipeIndex].membres.splice(index,1)
        this.membresEquipe.splice(membreIndex, 1)
      }
    });
    this.equipeService.update(this.equipes[this.equipeIndex])
      .subscribe(res=>{
        console.log(res)
      }, error => error)
  }

  openDialogDeleteEquipe(index:number) {
    if(confirm("Are you sure to delete "+this.equipes[index].nom)) {
      this.onDeleteEuipe(index)
    }
  } 

  openDialogDeleteMember(memberIndex:number) {
    if(confirm("Are you sure to delete member")) {
      this.onDeleteMembre(memberIndex)
    }
  } 

}
