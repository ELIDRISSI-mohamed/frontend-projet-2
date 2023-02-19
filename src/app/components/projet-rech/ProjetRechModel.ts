import {ProfesseurModel} from "../professeur/ProfesseurModel";


export class ProjetRechModel {
  public id?: number;
  public nom?: string;
  public responsable?: ProfesseurModel;
  public membres?: Array<ProfesseurModel>;
  public budget_annuel?: number;

  constructor(id?: number, nom?: string, responsable?: ProfesseurModel, membres?: Array<ProfesseurModel>, budget_annuel?: number) {
    this.id = id;
    this.nom = nom;
    this.responsable = responsable;
    this.membres = membres;
    this.budget_annuel = 0;
  }

}
