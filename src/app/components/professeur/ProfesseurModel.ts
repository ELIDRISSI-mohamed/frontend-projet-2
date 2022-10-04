import {RubriqueModel} from "../rubrique/RubriqueModel";

export class ProfesseurModel {

  public id?: number;
  public nom?: string;
  public prenom?: string;
  public mail?: string;

  constructor(id?:number, nom?:string, prenom?:string, mail?:string) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.mail = mail;
  }

}
