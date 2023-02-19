import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BudgetService } from 'src/app/services/budget.service';
import { KeycloakSecurityService } from 'src/app/services/keycloak-security.service';
import { RubriqueService } from 'src/app/services/rubrique.service';
import { BudgetModel } from './BudgetModel';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})

export class BudgetComponent implements OnInit {

  hideFormError:Boolean = true
  hideFormOk:Boolean = true
  search: any;
  roleAncienName:any;
  formMessage = ""
  budgetModel = new BudgetModel();
  budgets: any;

  constructor(private ngxService:NgxUiLoaderService, public kcService: KeycloakSecurityService, private router: Router, private budgetService:BudgetService) { }

 
  ngOnInit(): void {
    if(this.kcService.kc.authenticated){
      if(!this.isAdmin())  this.router.navigate(['/error'])
      this.budgetService.all().subscribe(res=>{
        this.budgets = res
      }, error => error)
    } else{
      this.router.navigate(['/']);
    }
  }

  isAdmin() {
    return this.kcService.kc.hasRealmRole('ROLE_ADMIN')
  }

  onSubmit() {
    this.hideFormError = true;
    if(!this.budgetModel.nom || !this.budgetModel.budget) {
      this.hideFormError = false;
      this.formMessage = "Erreur remplissez tous les champs"
      return ;
    }
    this.ngxService.start();
    if(!this.budgetModel.id) {
      console.log("add")
      this.budgetService.add(this.budgetModel).subscribe(res =>{
        if(res) {
          this.hideFormOk = false
          this.formMessage = "BIEN AJOUTER"
        }
      }, error => error)
    } else {
      console.log("update")
      this.budgetService.update(this.budgetModel).subscribe(res =>{
        console.log(res)
      }, error => error)
    }
    this.budgetModel = new BudgetModel()
    this.ngxService.stop();
  }

  onCancel() {
    this.budgetModel = new BudgetModel();
  }

  onDelete(index: any) {
    this.ngxService.start();
    this.budgetService.delete(this.budgets[index].id).subscribe(res=>{
      this.budgets.splice(index, 1)
    }, err => err)

    this.ngxService.stop();

  }

  onEdit(budget: any) {
    this.budgetModel= budget
  }

  openDialogDelete(index:number) {
    if(confirm("Are you sure to delete "+this.budgets[index].nom)) {
      this.onDelete(index)
    }
  } 
}
