import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  id: number | undefined;

  orderIdForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
  });
  order: Order | undefined;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((pram) => {
      if (pram['id']) {
        this.id = pram['id'];
        this.orderIdForm.setValue({
          id: this.id?.toString() ?? '',
        });
        this.getOrder();
      }
    });

    
  }
  getOrder() {
    const id = Number(this.orderIdForm.value.id);
    this.orderService.getOrder(id).subscribe((x) => (this.order = x));
  }
}
