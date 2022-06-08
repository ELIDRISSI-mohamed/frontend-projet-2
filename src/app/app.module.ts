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
import { ProductsComponent } from './components/products/products.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { IndexComponent } from './components/index/index.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { CustomerComponent } from './components/customer/customer.component';


export function kcFactory(kcSerurity:KeycloakSecurityService){
  return () => kcSerurity.init();
}

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    SuppliersComponent,
    NavbarComponent,
    SidebarComponent,
    IndexComponent,
    ErrorPageComponent,
    CustomerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxUiLoaderModule,
    Ng2SearchPipeModule
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
