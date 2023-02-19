import { Component, OnInit } from '@angular/core';
import {KeycloakSecurityService} from "../../services/keycloak-security.service";
import {Globals} from "../../utils/Globas";
import {Router} from "@angular/router";
import {PageAdminService} from "../../services/page-admin.service";
import { ChartConfiguration } from 'chart.js';
import {ProjetRechModel} from "../projet-rech/ProjetRechModel";

@Component({
  selector: 'app-page-admin',
  templateUrl: './page-admin.component.html',
  styleUrls: ['./page-admin.component.css']
})
export class PageAdminComponent implements OnInit {
  nbrProfs:number =0
  nbrEquipes:number =0
  nbrProjets:number =0
  nbrLabos:number =0
  nbrProduits:number =0
  nbrRubriques:number =0
  nbrBudgets:number =0
  data:any=[]
  dataProjets:any=[]
  dataLabos:any=[]
  dataEquipes:any=[]
  dataBudgets:any=[]
  
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartDataProjets: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      { data: [], label: 'Projets-Budgets' },
    ]
  };
  public barChartDataLabos: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      { data: [], label: 'Laboratoires-Budgets' },
    ]
  };
  public barChartDataEquipes: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      { data: [], label: 'Equipes-Budgets' },
    ]
  };
  public barChartDataBudgets: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      { data: [], label: 'Valeurs-Budgets' },
    ]
  };
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
  };

  constructor(private globals: Globals, private router: Router,private pageAdminSerice: PageAdminService,public kcService : KeycloakSecurityService) {
  }

  async ngOnInit() {

    if(this.kcService.kc.authenticated){
      if(!this.globals.isAdmin())  this.router.navigate(['/error'])

      //count profs
      this.data = await this.pageAdminSerice.allProfs()
      this.nbrProfs=this.data.length
      //count projets
      this.dataProjets = await this.pageAdminSerice.allProjets()
      this.nbrProjets=this.dataProjets.length
        //Char bar Projet
        this.dataProjets.map((p:any,k:number) =>{
          console.log(p)
          this.barChartDataProjets.labels?.push(p.nom)
          this.barChartDataProjets.datasets[0].data.push(p.budget_annuel)
        })

      //count equipes
      this.dataEquipes = await this.pageAdminSerice.allEquipes()
      this.nbrEquipes=this.dataEquipes.length
        //Char bar Equipe
        this.dataEquipes.map((p:any,k:number) =>{
          this.barChartDataEquipes.labels?.push(p.nom)
          this.barChartDataEquipes.datasets[0].data.push(p.budget_annuel)
        })
      //count labos
      this.dataLabos = await this.pageAdminSerice.allLabos()
      this.nbrLabos=this.dataLabos.length
      console.log(this.dataLabos)
        //Char bar labo
        this.dataLabos.map((p:any,k:number) =>{
          this.barChartDataLabos.labels?.push(p.intitule)
          this.barChartDataLabos.datasets[0].data.push(p.budget_annuel)
        })
      //count budgets
      this.dataBudgets = await this.pageAdminSerice.allBudgets()
      this.nbrBudgets=this.dataBudgets.length
        //Char bar Equipe
        this.dataBudgets.map((p:any,k:number) =>{
          this.barChartDataBudgets.labels?.push(p.nom)
          this.barChartDataBudgets.datasets[0].data.push(p.budget)
        })
      
      //count prodtuis
      this.data = await this.pageAdminSerice.allProduits()
      this.nbrProduits=this.data.length
      //count rub
      this.data = await this.pageAdminSerice.allRubriques()
      this.nbrRubriques=this.data.length

      this.barChartOptions = {
        responsive:false
      };
    } else{
      this.router.navigate(['/']);
    }
  }

}
