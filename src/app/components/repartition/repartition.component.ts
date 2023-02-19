import { Component, OnInit } from '@angular/core';
import {Globals} from "../../utils/Globas";
import {Router} from "@angular/router";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {ProfesseurService} from "../../services/professeur.service";
import {KeycloakSecurityService} from "../../services/keycloak-security.service";
import {BudgetService} from "../../services/budget.service";
import {ProjetRechService} from "../../services/projet-rech.service";
import {EquipeService} from "../../services/equipe.service";
import {LaboService} from "../../services/labo.service";
import {BudgetModel} from "../budget/BudgetModel";
import {RepartitionModel} from "./repartition";
import { RepartitionService } from 'src/app/services/repartition.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnyARecord } from 'dns';
import { RubriqueService } from 'src/app/services/rubrique.service';

@Component({
  selector: 'app-repartition',
  templateUrl: './repartition.component.html',
  styleUrls: ['./repartition.component.css']
})
export class RepartitionComponent implements OnInit {
  hideFormError:Boolean = true
  hideFormOk:Boolean = true
  formMessage = ""
  search:string
  listForm = ["", "Projet-Recherche", "Equipe-Recherche", "Laboratoire-Recherche", "Rubrique"]
  valueSelected: any
  budgets: any = []
  repartitions: any = []
  budget: BudgetModel | any = new BudgetModel()
  indexBudget:any
  repratition: RepartitionModel | any = Array<RepartitionModel>()
  rep: any = new RepartitionModel()
  data: any
  pourcentage: any;
  structure: any;

  constructor(private modalService: NgbModal, private globals: Globals, private router: Router, private ngxService: NgxUiLoaderService, private budgetService: BudgetService, private projetRechService: ProjetRechService, private laboService: LaboService, private equipeService: EquipeService,private repartitionService: RepartitionService, private rubriqueService: RubriqueService, public kcService : KeycloakSecurityService) {
  }

  ngOnInit(): void {
    this.budgetService.all().subscribe(res=>{
      this.budgets = res
    }, err => err )
    //get all reparitions
    this.repartitionService.all().subscribe(res=>{
      this.repartitions = res
      console.log(this.repartitions)
    }, err => err)

  }

  openXl(content:any, index:any) {
    this.modalService.open(content, { size: 'xl' });
    
  }

  onChangeStructure(event: any) {
    this.valueSelected = event.target.value
    if(this.valueSelected=="Projet-Recherche") {
      this.projetRechService.all()
        .subscribe(res=>{
          this.data = res;
        },err => err)
    }
    else if(this.valueSelected=="Equipe-Recherche") {
      this.equipeService.allEquipes()
        .subscribe(async res=>{
          this.data = res;
        },err =>{
          console.log(err);
        })
    }
    else if(this.valueSelected=="Laboratoire-Recherche") {
      this.laboService.getAll()
        .subscribe(async res=>{
          this.data = res;
        },err =>{
          console.log(err);
        })
    }
    else if(this.valueSelected=="Rubrique") {
      this.rubriqueService.allRubriques()
        .subscribe(async res=>{
          this.data = res;
        },err =>{
          console.log(err);
        })
    }
  }

  onChangeBudget(event: any) {
    this.budgets.map((bud:any, index:any)=>{
      if(bud.id==event.target.value) {
        this.indexBudget = index;
        this.budget = this.budgets[index]
        return;
      }
    })
  }
  onChangePourcenatge(event:any) {
    this.rep.sousBudget=this.pourcentage*this.budget.budget/100
  }
  onChangeSousBudget(event:any) {
    this.pourcentage=this.rep.sousBudget*100/this.budget.budget
  }
  onCancel() {
    console.log("Cancel")
    this.rep = new RepartitionModel()
    this.budget = new BudgetModel()
    this.structure = null
    this.pourcentage = null
  }

  async onSubmit() {
    this.hideFormError = true;
    this.hideFormOk = true;

    this.rep.idBudget = this.budget.id;
    this.rep.typeStructure = this.valueSelected
    this.rep.idStructure = this.structure.id;
    //add repartition
    if(this.rep.sousBudget>this.budget.budget){
      this.hideFormError = false
      this.formMessage = "ERREUR"
      return;
    }
    this.repartitionService.add(this.rep).subscribe(
      async res=> {

        if(res){
          //update budget
          this.budget.budget -= this.rep.sousBudget

          await this.budgetService.update(this.budget)
                .subscribe(res=> console.log(res)
                ,err => {console.log(err)
                  return;
              })

          //update structure
          if(this.valueSelected=="Rubrique") {
            this.structure.budget = Number(this.rep.sousBudget)
            await this.rubriqueService.updateRubrique(this.structure)
                .subscribe( res=>{
                  console.log(res);
                  this.hideFormOk = false
                  this.formMessage = "BIEN AJOUTER"
                },err => err)
          }
          else{
            this.structure.budget_annuel = Number(this.rep.sousBudget)
            if(this.valueSelected=="Projet-Recherche") {
              await this.projetRechService.update(this.structure)
                .subscribe( res=>{
                  console.log(res);
                  this.hideFormOk = false
                  this.formMessage = "BIEN AJOUTER"
                },err => err)
            }
            else if(this.valueSelected=="Equipe-Recherche") {
              await this.equipeService.update(this.structure)
                .subscribe(res=>{
                  console.log(res);
                  this.hideFormOk = false
                  this.formMessage = "BIEN AJOUTER"
                },err =>{
                  console.log(err);
                })
            }
            else if(this.valueSelected=="Laboratoire-Recherche") {
              await this.laboService.updateLabo(this.structure)
                .subscribe(res=>{
                  console.log(res);
                  this.hideFormOk = false
                  this.formMessage = "BIEN AJOUTER"
                },err =>{
                  console.log(err);
                })
            }
          }
          this.rep = new RepartitionModel()
          this.budget = new BudgetModel()
          this.structure = null
          this.pourcentage = null
        }
      }
    , err=> console.log(err))
    
  }
  onEdit(reparition:RepartitionModel){
    console.log(reparition)
    this.rep = reparition
  }
  
  async onDelete(index:number){
    await this.repartitionService.delete(this.repartitions[index].id)
        .subscribe(res=> {
          this.repartitions.splice(index,1)
        }, err=> err)
    
  }
}
