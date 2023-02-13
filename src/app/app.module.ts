import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PizzaComponent } from './components/pizza/pizza.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatNativeDateModule} from '@angular/material/core';
import { MaterialModule } from '../material.module';
import { PizzaCardComponent } from './components/pizza-card/pizza-card.component';
import { PizzaDialogComponent } from './components/pizza-dialog/pizza-dialog.component';
import { ItemSizeFilterPipe } from './pipes/inventory-type-filter.pipe';
import { OrderComponent } from './components/order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    PizzaComponent,
    PizzaCardComponent,
    PizzaDialogComponent,
    ItemSizeFilterPipe,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
