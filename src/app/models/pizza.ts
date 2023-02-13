import { Size } from "../enums/size";
import { Cheese } from "./cheese";
import { Sauce } from "./sauce";
import { Topping } from "./topping";

export interface Pizza {
    size: Size;
    crust: string;
    cheese: Cheese[];
    toppings: Topping[];
    sauces: Sauce[];
    basePrice: number;
}