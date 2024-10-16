import { CartItems } from "./CartItems";
import { MenuItem } from "./MenuItem";

export class Order {

    restaurantName!: string;

    orderedItems!: CartItems[];

    price!: number;

    time!: string;

    
    constructor(restaurantName: string, orderedItems: CartItems[], price: number, time: string) {
        this.restaurantName = restaurantName;
        this.orderedItems = orderedItems;
        this.price = price;
        this.time = time;
    }

}