import { Component, OnInit } from '@angular/core';
import { KeycloakSecurityService } from 'src/app/services/keycloak-security.service';
import { Globals } from 'src/app/utils/Globas';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public kcService : KeycloakSecurityService, public globals: Globals) { }

  ngOnInit(): void {

  }

  
}
