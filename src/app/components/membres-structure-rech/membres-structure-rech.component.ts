import { Component, OnInit } from '@angular/core';
import {KeycloakSecurityService} from "../../services/keycloak-security.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-membres-structure-rech',
  templateUrl: './membres-structure-rech.component.html',
  styleUrls: ['./membres-structure-rech.component.css']
})
export class MembresStructureRechComponent implements OnInit {

  constructor(public kcService : KeycloakSecurityService, private modalService: NgbModal) { }

  ngOnInit(): void {
    console.log(this.isResponsable())
  }
  openXl(content:any) {
    this.modalService.open(content, { size: 'xl' });
  }

  isResponsable() {
    return this.kcService.kc.hasRealmRole('ROLE_ADMIN') || this.kcService.kc.hasRealmRole('ROLE_RESPONSABLE_STRUCTURE')
  }
}
