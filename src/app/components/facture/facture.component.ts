import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { KeycloakSecurityService } from 'src/app/services/keycloak-security.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {
  products : any
  totale = 0
  constructor(public kcService:KeycloakSecurityService, private router: Router) { }

  ngOnInit(): void {
    if(!this.kcService.kc.authenticated) this.router.navigate(['/']);    
    
    this.products = localStorage.getItem('productsSelected');
    this.products = JSON.parse(this.products)
    for(let i=0;i<this.products.length;i++) {
      this.totale += this.products[i].prixTotal
    }
  }

  
  //@ViewChild('content', { static: false }) el!: ElementRef;
  @ViewChild('htmlData') htmlData!: ElementRef;
  // title = 'facture';
  makePdf(){
    let DATA: any = document.getElementById('htmlData');
      html2canvas(DATA).then((canvas) => {
        let fileWidth = 208;
        console.log(canvas.height)
        console.log(canvas.width)
        let fileHeight = (canvas.height * fileWidth) / canvas.width;
        const FILEURI = canvas.toDataURL('image/png');
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
        PDF.save(this.kcService.kc.tokenParsed.preferred_username+'-facture.pdf');
      });
  }
  // makePdf() {
  //   let pdf = new jsPDF()
  //   pdf.html(this.el.nativeElement, {
  //     callback: (pdf) => {
  //       pdf.save("sample.pdf")
  //     }
  //   })
  // }
  
}
