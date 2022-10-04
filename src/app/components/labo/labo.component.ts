import { Component, OnInit } from '@angular/core';
import {ProfesseurModel} from "../professeur/ProfesseurModel";
import {ProfesseurKeycloak} from "../professeur/ProfesseurKeycloak";
import {Globals} from "../../utils/Globas";
import {Router} from "@angular/router";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {ProfesseurService} from "../../services/professeur.service";
import {KeycloakSecurityService} from "../../services/keycloak-security.service";
import {EquipeService} from "../../services/equipe.service";
import {LaboModel} from "./LaboModel";
import {LaboService} from "../../services/labo.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-labo',
  templateUrl: './labo.component.html',
  styleUrls: ['./labo.component.css']
})
export class LaboComponent implements OnInit {
  hideFormError:Boolean = true
  hideFormOk:Boolean = true
  formMessage = ""
  profs: any;
  labo = new LaboModel();
  labos: any;
  membresSelected:any
  equipesSelected:any;
  profsUsername: any;
  equipes: any;
  membresLabo:any;
  equipesLabo:any;
  laboIndex:any;
  search : any;
  dropdownList: any;
  dropdownSettings:any;
  equipeDropdownSettings:any;


  constructor(private modalService: NgbModal,private globals: Globals, private router: Router, private ngxService: NgxUiLoaderService,private laboService: LaboService,private equipeService: EquipeService,private professeurService: ProfesseurService, public kcService : KeycloakSecurityService) {
  }

  ngOnInit(): void {
    this.dropdownSettings = {
      idField: 'id',
      textField: 'username',
      selectAllText: 'Select All Profs From List',
      unSelectAllText: "UnSelect All Items From List",
    };
    this.equipeDropdownSettings = {
      idField: 'id',
      textField: 'nom',
      selectAllText: 'Select All Equipe From List',
      unSelectAllText: "UnSelect All Items From List",
    };

    if(this.kcService.kc.authenticated){
      if(!this.isAdmin())  this.router.navigate(['/error'])
      //all profs
      this.professeurService.getProfs()
        .subscribe(async res=>{
          this.profs = res;
          console.log(this.profs)

        },err =>{
          console.log(err);
        })
      //Get all equipes
      this.equipeService.allEquipes()
        .subscribe(async res=>{
          this.equipes = res;
        },err =>{
          console.log(err);
        })
      //Get all username profs
      this.professeurService.getUsernameProfs()
        .subscribe(async res=>{
          this.profsUsername = res;
        },err =>{
          console.log(err);
        })
      //Get all labos
      this.laboService.getAll()
        .subscribe(async res=>{
          this.labos = res;
        },err =>{
          console.log(err);
        })
    } else{
      this.router.navigate(['/']);
    }

  }

  openXl(content:any, index:any) {
    this.modalService.open(content, { size: 'xl' });
    this.laboIndex = index
    this.laboService.getMembres(this.labos[index].id)
      .subscribe(res=>{
        this.membresLabo = res
      }, error => error)
    this.laboService.getEquipe(this.labos[index].id)
      .subscribe(res=>{
        this.equipesLabo = res
      }, error => error)
  }

  onSubmit() {
    this.hideFormError = true;
    if(!this.labo.intitule || !this.labo.acronyme || !this.equipesSelected || !this.labo.budget_annuel || !this.membresSelected || !this.labo.responsable) {
      this.hideFormError = false;
      this.formMessage = "Erreur remplissez tout les champs"
      return ;
    }
    this.labo.membres = this.membresSelected
    this.labo.equipe = this.equipesSelected

    this.ngxService.start();
    if(!this.labo.id) {
      console.log("add Labo")
      this.hideFormOk = false;
      this.formMessage = "Bien Ajouter"
      this.laboService.addLabo(this.labo).subscribe(res=>{
          console.log(res)
        }, error => error)
    } else {
      console.log("Modification");
      this.hideFormOk = false;
      this.formMessage = "Bien Modifier"
      this.laboService.updateLabo(this.labo).subscribe(res=>{
        console.log(res)
      }, error => error)
    }
    this.labo = new LaboModel();
    this.membresSelected=[]
    this.equipesSelected=[]
    this.ngxService.stop();
  }

  onCancel() {
    this.labo = new LaboModel();
    this.membresSelected = []
    this.equipesSelected = []
  }

  onEdit() {
    this.labo = this.labos[this.laboIndex]
    this.membresSelected = this.labo.membres
    this.equipesSelected = this.labo.equipe
  }

  onEditLabo(index:any) {
    this.labo = this.labos[index]
    this.membresSelected = this.labo.membres
    this.equipesSelected = this.labo.equipe
  }

  onDeleteLabo(index:any) {
    console.log("delete ", this.labos[index].id);

    this.ngxService.start();
    this.laboService.deleteLabo(this.labos[index].id).subscribe(res=>{
      console.log(res)
      this.labos.splice(index, 1)
    }, err => err)

    this.ngxService.stop();
  }

  isAdmin() {
    return this.kcService.kc.hasRealmRole('ROLE_ADMIN')
  }

  onItemSelect() {
    console.log(this.membresSelected)
    console.log(this.equipesSelected)
  }
  async onItemDeSelect() {
    console.log(this.membresSelected)
    console.log(this.equipesSelected)
  }
  onSelectAll() {
    console.log(this.membresSelected)
    console.log(this.equipesSelected)
  }
  onUnSelectAll() {
    console.log(this.membresSelected)
    console.log(this.equipesSelected)
  }

  onDeleteMembre(membreIndex:any) {
    let index=-1
    this.labos[this.laboIndex].membres.map(async (membre:any, i:any)=>{
      console.log(membre)
      if(membre.id === this.membresLabo[membreIndex].id) {
        index=i
        await this.labos[this.laboIndex].membres.splice(index,1)
        await this.membresLabo.splice(membreIndex, 1)

        await this.laboService.updateLabo(this.labos[this.laboIndex])
          .subscribe(res=>{
            console.log(res)
            return;
          }, error => error)
      }
    });
  }

  onDeleteEquipe(equipeIndex:any) {
    console.log("on delete equipe ", equipeIndex)
    let index=-1
    this.equipes[this.laboIndex].equipe.find((equipe:any, i:any)=>{
      if(equipe.id === this.equipesLabo[equipeIndex].id) {
        index=i
        this.equipes[this.laboIndex].equipe.splice(index,1)
        this.equipesLabo.splice(equipeIndex, 1)
      }
    });
    this.laboService.updateLabo(this.labos[this.laboIndex])
      .subscribe(res=>{
        console.log(res)
      }, error => error)
  }
}
