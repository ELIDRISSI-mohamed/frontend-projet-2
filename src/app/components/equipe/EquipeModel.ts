import {ProfesseurModel} from "../professeur/ProfesseurModel";

export class EquipeModel {

  public id?: number;
  public nom?: string;
  public acronyme?: string;
  public responsable?: ProfesseurModel;
  public membres?: Array<ProfesseurModel>;
  public budget_annuel?: number;


  constructor(id?:number, nom?:string, acronyme?:string, responsable?:ProfesseurModel, membres?:Array<ProfesseurModel>, budget_annuel?:number) {
    this.id = id;
    this.nom = nom;
    this.acronyme = acronyme;
    this.responsable = responsable;
    this.membres = membres;
    this.budget_annuel = budget_annuel;
  }

}
