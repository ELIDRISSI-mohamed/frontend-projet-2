import { Component, OnInit } from '@angular/core';
import { KeycloakSecurityService } from 'src/app/services/keycloak-security.service';
import { Globals } from "../../utils/Globas";
import {Router} from "@angular/router";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(public kcService:KeycloakSecurityService, private globals: Globals, private router: Router) { }

  ngOnInit(): void {
    if(this.kcService.kc.authenticated) {
      if(this.globals.isAdmin()) {
        this.router.navigate(['/dashbordAdmin']);
      }
    }
  }

  Onlogin(){
    this.kcService.kc.login()
  }
}
