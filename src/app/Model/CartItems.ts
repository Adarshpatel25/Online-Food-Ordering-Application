import { MenuItem } from "./MenuItem";

export class CartItems {

    menuItem!: MenuItem;

    count: number = 0;

    constructor(menuItem: MenuItem, count: number) {
        this.menuItem = menuItem;
        this.count = count;
    }

}

