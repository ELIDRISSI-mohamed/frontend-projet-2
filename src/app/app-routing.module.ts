import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { ProfesseurComponent } from './components/professeur/professeur.component';
import { RubriqueComponent } from './components/rubrique/rubrique.component';
import { EquipeComponent } from "./components/equipe/equipe.component";
import { LaboComponent } from "./components/labo/labo.component";
import {RolesComponent} from "./components/roles/roles.component";
import {ProjetRechComponent} from "./components/projet-rech/projet-rech.component";
import {ProduitComponent} from "./components/produit/produit.component";
import { BudgetComponent } from './components/budget/budget.component';
import { PageAdminComponent } from './components/page-admin/page-admin.component';
import {RepartitionComponent} from "./components/repartition/repartition.component";
import { CommandeComponent } from './components/commande/commande.component';
import { FactureComponent } from './components/facture/facture.component';

const routes : Routes = [
  {path : "", component: IndexComponent},
  {path : "roles", component: RolesComponent},
  {path : "professeurs", component: ProfesseurComponent},
  {path : "equipes", component: EquipeComponent},
  {path : "labos", component: LaboComponent},
  {path : "projetsRech", component: ProjetRechComponent},
  {path : "produits", component: ProduitComponent},
  {path : "rubriques", component: RubriqueComponent},
  {path : "budgets", component: BudgetComponent},
  {path : "error", component: ErrorPageComponent},
  {path : "dashbordAdmin", component: PageAdminComponent},
  {path : "repartition", component: RepartitionComponent},
  {path : "commandes", component: CommandeComponent},
  {path : "factures", component: FactureComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule,
    CommonModule
  ]
})
export class AppRoutingModule { }
