import {RubriqueModel} from "../rubrique/RubriqueModel";


export class ProduitModel{
  public id?: number;
  public nom?: string;
  public description?: string;
  public rubrique?: RubriqueModel;
  public prix?: number;
  public qte?: number;
  public qteDemande?: number;

  constructor(id?: number, nom?: string, description?: string, rubrique?: RubriqueModel, prix?: number, qte?: number, qteDemande?: number) {
    this.id = id;
    this.nom = nom;
    this.description = description;
    this.rubrique = rubrique;
    this.prix = prix;
    this.qte = qte;
    this.qteDemande = qteDemande;
  }
}
