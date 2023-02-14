import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Item } from '../../models/item';
import { Order } from '../../models/order';
import { Pizza } from '../../models/pizza';
import { InventoryService } from '../../services/inventory.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-pizza-dialog',
  templateUrl: './pizza-dialog.component.html',
  styleUrls: ['./pizza-dialog.component.scss'],
})
export class PizzaDialogComponent implements OnInit {
  takingOrder = true;
  cartTotal = 0;
  order: Order | undefined;
  toppings$: Observable<Item[]>;
  sauces$: Observable<Item[]>;
  crust$: Observable<Item[]>;
  chese$: Observable<Item[]>;
  extraChese$: Observable<Item[]>;

  pizzaForm = new FormGroup({
    crustFc: new FormControl({} as Item),
    toppingFc: new FormControl({} as Item),
    sauceFc: new FormControl({} as Item),
    cheeseFc: new FormControl(false),
    ExtraCheeseFc: new FormControl(false),
  });

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobileNumber: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
    deliveryAddress: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });

  cheeseOptions: Item[] | undefined;
  extraCheeseOptions: Item[] | undefined;

  selectedCrust = {} as Item | null;
  selectedTopping = {} as Item | null;
  selectedSauce = {} as Item | null;
  cheesePrice = 0;
  extraCheesePrice = 0;

  constructor(
    private dialogRef: MatDialogRef<PizzaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public pizza: Item,
    private inventoryService: InventoryService,
    private orderService: OrderService,
    private router: Router
  ) {
    this.toppings$ = this.inventoryService.getToppings();
    this.sauces$ = this.inventoryService.getSauces();
    this.crust$ = this.inventoryService.getCrust();
    this.chese$ = this.inventoryService.getCheeseOptions();
    this.extraChese$ = this.inventoryService.getExtraCheeseOptions();
    this.cartTotal = this.getCartTotal();

    this.pizzaForm.get('crustFc')?.valueChanges.subscribe((x) => {
      this.selectedCrust = x;
      this.cartTotal = this.getCartTotal();
    });

    this.pizzaForm.get('toppingFc')?.valueChanges.subscribe((x) => {
      this.selectedTopping = x;
      this.cartTotal = this.getCartTotal();
    });
    this.pizzaForm.get('sauceFc')?.valueChanges.subscribe((x) => {
      this.selectedSauce = x;
      this.cartTotal = this.getCartTotal();
    });

    this.pizzaForm.get('cheeseFc')?.valueChanges.subscribe((x) => {
      this.cheesePrice = x
        ? this.cheeseOptions?.find((x) => x.size === this.pizza.size)?.price ??
          0
        : 0;
      this.cartTotal = this.getCartTotal();
    });

    this.pizzaForm.get('ExtraCheeseFc')?.valueChanges.subscribe((x) => {
      this.extraCheesePrice = x
        ? this.extraCheeseOptions?.find((x) => x.size === this.pizza.size)
            ?.price ?? 0
        : 0;
      this.cartTotal = this.getCartTotal();
    });
  }

  ngOnInit(): void {
    this.chese$.subscribe((x) => (this.cheeseOptions = x));
    this.extraChese$.subscribe((x) => (this.extraCheeseOptions = x));
  }

  getCartTotal(): number {
    const result =
      this.pizza.price +
      (this.cheesePrice ?? 0) +
      this.extraCheesePrice +
      (this.selectedCrust?.price ?? 0) +
      (this.selectedTopping?.price ?? 0) +
      (this.selectedSauce?.price ?? 0);

    return result;
  }

  placeOrder() {
    let orderedPizza = {
      basePrice: this.pizza.price,
      size: this.pizza.size,
      crust: this.selectedCrust?.name,
      cheese: [
        {
          extraCheesePrice: this.extraCheesePrice,
          price: this.cheesePrice,
        },
      ],
      sauces: [
        {
          price: this.selectedSauce?.price,
          type: this.selectedSauce?.name,
        },
      ],
      toppings: [
        {
          price: this.selectedTopping?.price,
          type: this.selectedTopping?.name,
        },
      ],
    } as Pizza;

    let order = {
      pizzas: [orderedPizza],
      user: this.userForm.value,
      value: this.cartTotal
    } as Order;

    this.orderService.placeOrder(order).subscribe((x: Order) => {
      const url = `/order/${x.id}`;
      this.dialogRef.close();
      this.router.navigateByUrl(url)
    });
  }
  
}
