export class RubriqueModel {

  public id?: number;
  public nom?: string;
  public description?: string;
  public budget?: string;

  constructor(id?:number, nom?:string, description?:string, budget?:string) {
    this.id = id;
    this.nom = nom;
    this.description = description;
    this.budget = budget;
  }
}
