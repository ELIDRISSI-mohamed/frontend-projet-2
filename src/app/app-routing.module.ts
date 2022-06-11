import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { IndexComponent } from './components/index/index.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { CustomerComponent } from './components/customer/customer.component';
import { FactureComponent } from './components/facture/facture.component';
import { CardsFactureComponent } from './components/cards-facture/cards-facture.component';
const routes : Routes = [
  {path : "", component: IndexComponent},
  {path : "products", component: ProductsComponent},
  {path : "customer", component: CustomerComponent},
  {path : "facture", component: FactureComponent},
  {path : "cardsFacture", component: CardsFactureComponent},
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
