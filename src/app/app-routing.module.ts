import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './components/order/order.component';
import { PizzaComponent } from './components/pizza/pizza.component';

const routes: Routes = [
  { path: '', component: PizzaComponent },
  { path: 'order', component: OrderComponent },
  { path: 'order/:id', component: OrderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
