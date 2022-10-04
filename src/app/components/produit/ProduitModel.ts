import {RubriqueModel} from "../rubrique/RubriqueModel";


export class ProduitModel{
  public id?: number;
  public nom?: string;
  public description?: string;
  public rubrique?: RubriqueModel;

  constructor(id?: number, nom?: string, description?: string, rubrique?: RubriqueModel) {
    this.id = id;
    this.nom = nom;
    this.description = description;
    this.rubrique = rubrique;
  }
}
