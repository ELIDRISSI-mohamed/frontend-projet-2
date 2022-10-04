import { Component, OnInit } from '@angular/core';
import { KeycloakSecurityService } from 'src/app/services/keycloak-security.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public kcService : KeycloakSecurityService) {
  }

  ngOnInit(): void {
  }

  onLogout(){
    this.kcService.kc.logout();
  }
  onLogin(){
    this.kcService.kc.login() ;
  }
  accountManage(){
    this.kcService.kc.accountManagement();
  }

}
