import { Order } from "./Order";

export class User {
    email!: string;
    password!: string;
    role!: string;
    orders!: Order[];

    constructor(email: string, password: string, role: string, orders: Order[]) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.orders = orders;
    }
}
