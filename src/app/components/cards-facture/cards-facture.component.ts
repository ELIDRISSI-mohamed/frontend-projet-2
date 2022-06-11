import { Component, OnInit } from '@angular/core';
import { KeycloakSecurityService } from 'src/app/services/keycloak-security.service';
import { FacutresService } from 'src/app/services/facutres.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards-facture',
  templateUrl: './cards-facture.component.html',
  styleUrls: ['./cards-facture.component.css']
})
export class CardsFactureComponent implements OnInit {
  factures: any= []
  search : any;
  constructor(public kcService:KeycloakSecurityService, private facutresService:FacutresService, private router:Router) { }

  ngOnInit(): void {
    if(!this.isAdmin()) this.router.navigate(['/error'])
    this.facutresService.getAll()
      .subscribe(res=>{
        this.factures = res
      })
  }
  
  isAdmin(){
    return this.kcService.kc.hasRealmRole('ROLE_ADMIN');
  }

}
