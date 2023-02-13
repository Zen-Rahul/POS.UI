import { Pizza } from "./pizza";
import { User } from "./user";

export interface Order {
    id: number,
    pizzas: Pizza[];
    user: User;
    value: number
}