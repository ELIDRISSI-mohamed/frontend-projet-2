import { Component, OnInit } from '@angular/core';
import { KeycloakSecurityService } from 'src/app/services/keycloak-security.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(public kcService:KeycloakSecurityService) { }

  ngOnInit(): void {
  }

  Onlogin(){
    this.kcService.kc.login()
  }
}
