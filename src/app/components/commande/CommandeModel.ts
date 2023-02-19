import { ProduitModel } from "../produit/ProduitModel";
import { ProfesseurModel } from "../professeur/ProfesseurModel"

export class CommandeModel {
    public id?: number;
    public responsable?: string;
    public produits? = [];
    public prixTotal?: number = 0;

    constructor(id?: number, responsable?: string, produits?: Array<ProduitModel>, prixTotal?: number){
        this.id = id;
        this.responsable = responsable;
        this.prixTotal = prixTotal;
    }

}
