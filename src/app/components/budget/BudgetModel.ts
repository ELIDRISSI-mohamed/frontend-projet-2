export class BudgetModel {
 
    public id?: number;
    public nom?: string;
    public description?: string;
    public budget?: number;
  
    constructor(id?:number, nom?:string, description?:string, budget?:number) {
      this.id = id;
      this.nom = nom;
      this.description = description;
      this.budget = budget;
    }
  }
  