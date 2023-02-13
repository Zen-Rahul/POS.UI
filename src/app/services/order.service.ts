import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  placeOrder(order: Order): Observable<any> {
    const url = `${environment.config.apiUrl}Order/place-order`;
    return this.httpClient.post(url, {"order": order});
  }

  getOrder(id: number): Observable<Order> {
    const url = `${environment.config.apiUrl}Order/${id}`;
    return this.httpClient.get<Order>(url);
  }
}
