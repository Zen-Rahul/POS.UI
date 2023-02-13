import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(private httpClient: HttpClient) {}

  getPizzaBases(): Observable<Item[]> {
    const url = `${environment.config.apiUrl}Inventory/pizza-base`;
    return this.httpClient.get<Item[]>(url);
  }

  getToppings(): Observable<Item[]> {
    const url = `${environment.config.apiUrl}Inventory/toppings`;
    return this.httpClient.get<Item[]>(url);
  }

  getSauces(): Observable<Item[]> {
    const url = `${environment.config.apiUrl}Inventory/sauces`;
    return this.httpClient.get<Item[]>(url);
  }

  getCheeseOptions(): Observable<Item[]> {
    const url = `${environment.config.apiUrl}Inventory/cheese`;
    return this.httpClient.get<Item[]>(url);
  }

  getExtraCheeseOptions(): Observable<Item[]> {
    const url = `${environment.config.apiUrl}Inventory/extra-cheese`;
    return this.httpClient.get<Item[]>(url);
  }

  getCrust(): Observable<Item[]> {
    const url = `${environment.config.apiUrl}Inventory/crust`;
    return this.httpClient.get<Item[]>(url);
  }
}
