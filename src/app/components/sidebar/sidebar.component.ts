import { Component, OnInit } from '@angular/core';
import { KeycloakSecurityService } from 'src/app/services/keycloak-security.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public kcService : KeycloakSecurityService) { }

  ngOnInit(): void {
    
  }

  isAdmin(){
    return this.kcService.kc.hasRealmRole('ROLE_ADMIN');
  }

}
