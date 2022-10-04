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
import {MembresStructureRechComponent} from "./components/membres-structure-rech/membres-structure-rech.component";


const routes : Routes = [
  {path : "", component: IndexComponent},
  {path : "roles", component: RolesComponent},
  {path : "professeurs", component: ProfesseurComponent},
  {path : "equipes", component: EquipeComponent},
  {path : "labos", component: LaboComponent},
  {path : "projetsRech", component: ProjetRechComponent},
  {path : "produits", component: ProduitComponent},
  {path : "rubriques", component: RubriqueComponent},
  {path : "membresStructures", component: MembresStructureRechComponent},
  {path : "error", component: ErrorPageComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule,
    CommonModule
  ]
})
export class AppRoutingModule { }
