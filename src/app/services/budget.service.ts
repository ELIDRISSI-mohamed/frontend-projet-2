import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { springUrl, tomcatUrl } from 'src/environments/environment';
import { BudgetModel } from '../components/budget/BudgetModel';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private httpClient: HttpClient) { }

  public all() {
    return this.httpClient.get(springUrl+"BUDGET-SERVICE/budgets")
  }
  public get(id:number) {
    return this.httpClient.get(springUrl+"BUDGET-SERVICE/budgets/"+id)
  }
  public add(budget:BudgetModel) {
    return this.httpClient.post(springUrl+"BUDGET-SERVICE/budgets", budget)
  }
  public update(budget:BudgetModel) {
    return this.httpClient.put(springUrl+"BUDGET-SERVICE/budgets", budget)
  }
  public delete(id:number) {
    return this.httpClient.delete(springUrl+"BUDGET-SERVICE/budgets/"+ id)
  }
}
