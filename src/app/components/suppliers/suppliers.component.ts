import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {
  suppliers : any;

  constructor() { }

  ngOnInit(): void {
    this.suppliers = [
      {"id": 1, "name": "idrissi", "email": "idrissi@gmail.com"},
      {"id": 2, "name": "karimi", "email": "karimi@gmail.com"},
      {"id": 3, "name": "mohamed", "email": "moahemadi@gmail.com"},
    ]
  }

}
