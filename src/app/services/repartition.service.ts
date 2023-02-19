import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { springUrl } from 'src/environments/environment';
import { RepartitionModel } from '../components/repartition/repartition';

@Injectable({
  providedIn: 'root'
})
export class RepartitionService {

  constructor(private httpClient: HttpClient) { }

  public all(){
    return this.httpClient.get(springUrl+"REPARTITION-SERVICE/repartitions")
  }
  public get(id:number){
    return this.httpClient.get(springUrl+"REPARTITION-SERVICE/repartitions/"+id)
  }
  public getByNom(nom:string){
    return this.httpClient.get(springUrl+"REPARTITION-SERVICE/repartitions/getByNom."+nom)
  }
  public add(repartition:RepartitionModel){
    return this.httpClient.post(springUrl+"REPARTITION-SERVICE/repartitions", repartition)
  }
  public update(repartition:RepartitionModel){
    return this.httpClient.put(springUrl+"REPARTITION-SERVICE/repartitions", repartition)
  }
  public delete(id:number){
    return this.httpClient.delete(springUrl+"REPARTITION-SERVICE/repartitions/"+id)
  }

}
