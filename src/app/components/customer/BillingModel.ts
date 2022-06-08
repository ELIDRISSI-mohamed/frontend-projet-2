export class BillingModel {
    public amount?: number;
    public nom?: string;

    constructor(amount?:number, nom?:string){
        this.amount = amount
        this.nom = nom
    }
}