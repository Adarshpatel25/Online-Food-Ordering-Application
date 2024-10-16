import { Injectable, LOCALE_ID } from '@angular/core';
import { SelectControlValueAccessor } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CartItems } from 'src/app/Model/CartItems';
import { MenuItem } from 'src/app/Model/MenuItem';
import { Order } from 'src/app/Model/Order';
import { User } from 'src/app/Model/User';


@Injectable({
  providedIn: 'root'
})
export class CartService {


  private cartItems: CartItems[] = JSON.parse(localStorage.getItem('cartItems')!) || [];

  totalPrice: number = 0;


  placeOrder(cartItems: CartItems[], price: number) {


    var userList = JSON.parse(localStorage.getItem('usersList')!);

    const currentUser: User = JSON.parse(localStorage.getItem("currentUser")!);

    const orders = userList.filter((usr : User) => usr.email === currentUser.email)[0].orders || [];


    const restaurant = JSON.parse(localStorage.getItem("selectedRestaurant")!);
    const time = new Date().toLocaleString();

    orders.push(new Order(restaurant.name, cartItems, price, time));


    userList = userList.map((usr: User) => {
      if (usr.email === currentUser.email) {
        return new User(currentUser.email, currentUser.password, currentUser.role, orders);
      }
      return usr;
    });

    localStorage.setItem('usersList', JSON.stringify(userList));


    // Clearing Cart
    localStorage.removeItem('cartItems');
    localStorage.removeItem('totalPrice');
    localStorage.removeItem('selectedRestaurant');
  }

  getCartItems(): Observable<CartItems[]> {

    return of(this.cartItems);
  }

  addToCart(item: MenuItem) {
    const currentPrice = localStorage.getItem('totalPrice');

    if (currentPrice) {
      this.totalPrice = JSON.parse(currentPrice);
    }
    else {
      this.totalPrice = 0;
    }

    this.totalPrice += item.price;
    localStorage.setItem("totalPrice", JSON.stringify(this.totalPrice));


    const cartItem = this.cartItems.filter(it => it.menuItem.name === item.name);
    console.log("Cart item ", cartItem);


    if (cartItem.length > 0) {

      this.cartItems = this.cartItems.map(it => {
        if (it.menuItem.name === item.name) {
          return { "menuItem": it.menuItem, "count": it.count + 1 };
        }
        return { "menuItem": it.menuItem, "count": it.count };
      });
    }
    else {
      this.cartItems.push({ "menuItem": item, "count": 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));

  }

  removeFromCart(item: MenuItem) {
    const currentPrice = localStorage.getItem('totalPrice');

    if (currentPrice) {
      this.totalPrice = JSON.parse(currentPrice);
    }
    this.totalPrice -= item.price;

    localStorage.setItem("totalPrice", JSON.stringify(this.totalPrice));

    const count = this.cartItems.filter(it => it.menuItem.name === item.name)[0].count;

    if (count > 1) {

      this.cartItems = this.cartItems.map(it => {
        if (it.menuItem.name === item.name) {
          return { "menuItem": it.menuItem, "count": it.count - 1 };
        }
        return { "menuItem": it.menuItem, "count": it.count };
      });
    }
    else {
      this.cartItems = this.cartItems.filter(it => it.menuItem.name !== item.name);
    }


    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }


  calculateTotalPrice(): number {

    this.totalPrice = this.cartItems.reduce((acc, item) => {
      return acc + item.menuItem.price * item.count;
    }, 0);

    localStorage.setItem('totalPrice', this.totalPrice.toString());

    return this.totalPrice;
  }




  clearCart() {
    this.cartItems = [];
    localStorage.removeItem('cartItems');
  }
}
