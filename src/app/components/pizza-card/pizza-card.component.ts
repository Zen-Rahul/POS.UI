import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Item } from '../../models/item';
import { PizzaDialogComponent } from '../pizza-dialog/pizza-dialog.component';

@Component({
  selector: 'app-pizza-card',
  templateUrl: './pizza-card.component.html',
  styleUrls: ['./pizza-card.component.scss'],
})
export class PizzaCardComponent {
  constructor(public dialog: MatDialog) {}

  @Input() pizza: Item | undefined;
  @Input() showAction = false;

  openAddOnDialog() {
    this.dialog.open(PizzaDialogComponent, {
      data: this.pizza,
    });
  }
}
