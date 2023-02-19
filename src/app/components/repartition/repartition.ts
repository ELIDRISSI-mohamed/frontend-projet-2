import { BudgetModel } from "../budget/BudgetModel";


export class RepartitionModel {
  public id?:number;
  public nom?:string;
  public idBudget?:number;
  public sousBudget?:number;
  public typeStructure?:Array<string>;
  public idStructure?:Array<number>;


  constructor(id?: number, nom?: string, idBudget?: number, sousBudget?: number,typeStructure?: Array<string>, idStructure?: Array<number>) {
    this.id = id;
    this.nom = nom;
    this.idBudget = idBudget;
    this.sousBudget = sousBudget;
    this.typeStructure = typeStructure;
    this.idStructure = idStructure;
  }
}
