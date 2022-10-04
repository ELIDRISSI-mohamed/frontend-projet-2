import { AppRoutingModule } from './app-routing.module';
import { KeycloakSecurityService } from './services/keycloak-security.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { RequestInterceptorService } from './services/request-interceptor.service';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { DatePipe } from '@angular/common';
import { Globals } from './utils/Globas';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { IndexComponent } from './components/index/index.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { ProfesseurComponent } from './components/professeur/professeur.component';
import { RubriqueComponent } from './components/rubrique/rubrique.component';
import { LaboComponent } from './components/labo/labo.component';
import { EquipeComponent } from './components/equipe/equipe.component';

import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { RolesComponent } from './components/roles/roles.component';
import { ProjetRechComponent } from './components/projet-rech/projet-rech.component';
import { ProduitComponent } from './components/produit/produit.component';
import { CommandeComponent } from './components/commande/commande.component';
import { MembresStructureRechComponent } from './components/membres-structure-rech/membres-structure-rech.component';


export function kcFactory(kcSerurity:KeycloakSecurityService){
  return () => kcSerurity.init();
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    IndexComponent,
    ErrorPageComponent,
    ProfesseurComponent,
    RubriqueComponent,
    LaboComponent,
    EquipeComponent,
    RolesComponent,
    ProjetRechComponent,
    ProduitComponent,
    CommandeComponent,
    MembresStructureRechComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxUiLoaderModule,
    Ng2SearchPipeModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgbModule

  ],
  providers: [
    { provide: APP_INITIALIZER, deps:[KeycloakSecurityService], useFactory:kcFactory, multi:true},
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptorService, multi:true},
    DatePipe,
    Globals
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
