import { Component, OnInit } from '@angular/core';
import {KeycloakSecurityService} from "../../services/keycloak-security.service";
import {Router} from "@angular/router";
import {RoleModel} from "./RoleModel";
import {last} from "rxjs";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {RoleService} from "../../services/role.service";
import {Globals} from "../../utils/Globas";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  hideFormError:Boolean = true
  hideFormOk:Boolean = true
  search: any;
  roleAncienName:any;
  formMessage = ""
  role = new RoleModel();
  roles: any;

  constructor(public kcService: KeycloakSecurityService, private router: Router, private ngxService: NgxUiLoaderService, private roleService:RoleService, private globals:Globals){ }

  ngOnInit(): void {
    if(this.kcService.kc.authenticated){
      if(!this.globals.isAdmin())  this.router.navigate(['/error'])
      this.roleService.allRoles().subscribe(res=>{
        this.roles = res
      }, error => error)
    } else{
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    this.hideFormError = true;
    if(!this.role.name ) {
      this.hideFormError = false;
      this.formMessage = "Erreur remplissez tout les champs"
      return ;
    }
    this.ngxService.start();
    if(!this.role.id) {
      console.log("add")

      this.roleService.addRole(this.role).subscribe(res =>{
        if(res) {
          this.hideFormError = false;
          this.formMessage = res.toString()
        }
      }, error => error)
    } else {
      console.log("update")
      this.roleService.updateRole(this.roleAncienName, this.role).subscribe(res =>{
        if(res) {
          this.hideFormError = false;
          this.formMessage = res.toString()
        }
      }, error => error)
    }
    this.role = new RoleModel()
    this.ngxService.stop();
  }

  onCancel() {
    this.role = new RoleModel();
  }

  onDelete(index: any) {
    this.ngxService.start();
    this.roleService.deleteRole(this.roles[index].name).subscribe(res=>{
      console.log(res)
      this.roles.splice(index, 1)
    }, err => err)

    this.ngxService.stop();

  }

  onEdit(role: any) {
    this.role = role
    this.roleAncienName = role.name
  }
}
