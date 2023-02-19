import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { KeycloakSecurityService } from 'src/app/services/keycloak-security.service';
import { CommandeModel } from '../commande/CommandeModel';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {
  commandeParsed : any
  commande: CommandeModel | any =  new CommandeModel()
  prixTotal = 0
  constructor(public kcService:KeycloakSecurityService, private router: Router) { }

  ngOnInit(): void {
    if(!this.kcService.kc.authenticated) this.router.navigate(['/']);    
    
    this.commande = localStorage.getItem('commande');
    this.commandeParsed = JSON.parse(this.commande);
    console.log(this.commandeParsed)
    for(let i=0;i<this.commandeParsed.produits.length;i++) {
      this.prixTotal += (this.commandeParsed.produits[i].prix*this.commandeParsed.produits[i].qteDemande)
    }
   
  }

  
  //@ViewChild('content', { static: false }) el!: ElementRef;
  @ViewChild('htmlData') htmlData!: ElementRef;
  // title = 'facture';
  makePdf(){
    let DATA: any = document.getElementById('htmlData');
      html2canvas(DATA).then((canvas) => {
        let fileWidth = 200;
        let fileHeight = (canvas.height * fileWidth) / canvas.width;
        const FILEURI = canvas.toDataURL('image/png');
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 10;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
        PDF.save(this.kcService.kc.tokenParsed.name+'-facture.pdf');
      });

  }
}