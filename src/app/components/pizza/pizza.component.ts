import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../../models/item';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss'],
})
export class PizzaComponent {
  pizza$: Observable<Item[]>;

  constructor(private _inventoryService: InventoryService) {
    this.pizza$ = this._inventoryService.getPizzaBases();
  }
}
