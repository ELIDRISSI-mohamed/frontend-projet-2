import {ProfesseurModel} from "../professeur/ProfesseurModel";
import {EquipeModel} from "../equipe/EquipeModel";

export class LaboModel {

  public id?: number;
  public intitule?: string;
  public acronyme?: string;
  public responsable?: ProfesseurModel;
  public membres?: Array<ProfesseurModel>;
  public budget_annuel?: number;
  public equipe?: Array<EquipeModel>;

  constructor(id?: number, intitule?: string, acronyme?: string, responsable?: ProfesseurModel, membres?: Array<ProfesseurModel>, budget_annuel?: number, equipe?: Array<EquipeModel>) {
    this.id = id;
    this.intitule = intitule;
    this.acronyme = acronyme;
    this.responsable = responsable;
    this.membres = membres;
    this.budget_annuel = budget_annuel;
    this.equipe = equipe;
  }
}
