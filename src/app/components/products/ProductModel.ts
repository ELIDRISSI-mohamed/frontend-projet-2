export class ProductModel {

    
    
    public id?: number;
    public libele?: string;
    public prix?: number;
    public qte?: number;
    public date?: any;
    public description?: string;

    // public id: number;
    // public libele: string;
    // public prix: number;
    // public qte: number;
    // public date : Date;
    // public description: string;

    constructor(id?:number, libele?:string, prix?:number, qte?:number, date?:string, description?:string) {
      this.id = id;
      this.libele = libele;
      this.prix = prix;
      this.qte = qte;
      this.date = date;
      this.description = description;
    }

}