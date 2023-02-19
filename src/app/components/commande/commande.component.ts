import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CommandeService } from 'src/app/services/commande.service';
import { KeycloakSecurityService } from 'src/app/services/keycloak-security.service';
import { ProduitService } from 'src/app/services/produit.service';
import { RubriqueService } from 'src/app/services/rubrique.service';
import { Globals } from 'src/app/utils/Globas';
import { ProduitModel } from '../produit/ProduitModel';
import { CommandeModel } from './CommandeModel';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {
  hideFormError:Boolean = true
  hideFormOk:Boolean = true
  formMessage = ""
  search : any;
  produits: any;
  rubriques: any;
  produit: ProduitModel | any = new ProduitModel();
  indexProduit: number
  panier : any = [];
  qteDemande: number | any = 0;
  prixTotal: number | any = 0;
  commande: CommandeModel | any = new CommandeModel()
  commandes: any = []
  newProd: any = [];

  constructor(private modalService: NgbModal,private commandeService: CommandeService, private rubriqueSerice: RubriqueService ,private globas: Globals,private produitService: ProduitService, private router: Router, private ngxService: NgxUiLoaderService, public kcService : KeycloakSecurityService) { }

  ngOnInit(): void {
    //all produits
    this.produitService.allProduits().subscribe(res=>{
      this.produits= res;
      console.log(this.produits)
    },err => err)
    //all rubriques
    this.rubriqueSerice.allRubriques().subscribe(res=>{
      this.rubriques= res;
    },err => err)
    console.log(this.kcService.kc.tokenParsed.name)
    //all commandes
    this.commandeService.all().subscribe(res=>{
      this.commandes = res
    }, err => err)
  }
  
  openXl(content:any) {
    this.modalService.open(content, { size: 'xl' });
    console.log(this.commandes)
    
  }

  onChangePorduit(event:any){
    this.produits.map((produit:any, index:any)=>{
      if(produit.id==event.target.value) {
        this.indexProduit = index;
        this.produit = this.produits[index]
        return;
      }
    })
  }

  onAjouter(){
    this.hideFormError = true;
    if(!this.produit.qteDemande) {
      this.hideFormError = false;
      this.formMessage = "Erreur remplissez tous les champs"
      return ;
    }
    if(this.produit.qte<this.produit.qteDemande){
      this.hideFormError = false;
      this.formMessage = "Qte non disponible"
      return ;
    }
    this.ngxService.start()
    //update qte de produit selectionner
    this.produits[this.indexProduit].qte -= this.produit.qteDemande
    this.commande.produits.push(this.produit)
    this.produit = new ProduitModel();
    this.prixTotal=0
    this.ngxService.stop()
  }

  onCancel(){
    this.produit = new ProduitModel()
  }

  onDeleteItem(index:any){
    this.ngxService.start()
    if (index !== -1) {
      this.commande.produits.splice(index, 1);
    }
    this.ngxService.stop()
  }
  
  eventPrix(){
    this.prixTotal = this.produit.qteDemande*this.produit.prix  
  }

  async checkRubriqueBudget(){
    let bool = true
    var counts = await this.commande.produits.reduce((p:any, c:any) => {
      var nom = c.rubrique.nom;
      if (!p.hasOwnProperty(nom)) {
        p[nom] = 0;
      }
      p[nom] += (c.prix*c.qteDemande);
      return p;
    }, {});

    await this.rubriques.map((rub:any)=>{
      let name = rub.nom
      if(bool){
        if(!isNaN(counts[name])) {
          if(rub.budget>counts[name]){
          } else{
            this.hideFormError = false;
            this.formMessage = "Budget du rubrique "+rub.nom+" est inssiffusant !!!"
            bool = false 
          }
        } 
      }
    })
    console.log(this.produits)
    return bool;
  }

  async updateProduct(p:any) {
    await this.produitService.updateProduit(p).subscribe(res=>{
      console.log(res)
    }, err=> err)
  }
  async onSendCommande(){
    this.hideFormError = true;
    this.ngxService.start();
    this.commande.responsable = this.kcService.kc.tokenParsed.name
    this.commande.prixTotal = 0

    console.log(this.commande);
    let bool = await this.checkRubriqueBudget();
    console.log(this.commande)

    if(bool){
      localStorage.setItem('commande', JSON.stringify(this.commande));
      this.commande.produits.map((p:any)=>{
        this.commande.prixTotal += Number(p.qteDemande*p.prix)
      })
      //add commande
      await this.commandeService.save(this.commande).subscribe(res=>{
        console.log(res)
      }, err=> err)
      //update produits
      this.commande.produits.map((p:any)=>{
        delete p.qteDemande
        this.newProd.push(p)
      })
      await this.newProd.map(async (p:any)=>{
        await this.updateProduct(p);
      })
      //fin update commmande
      this.router.navigate(['/factures']);  
    }
    this.ngxService.stop()
  }

  onDownload(index: any) {
    console.log(this.commandes[index])
    this.ngxService.start();
    localStorage.setItem('commande', JSON.stringify(this.commandes[index]));
    this.router.navigate(['/factures']);  
    this.ngxService.stop();
  }
}
