import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { CartItems } from 'src/app/Model/CartItems';
import { MenuItem } from 'src/app/Model/MenuItem';
import { CartService } from 'src/app/Services/CartService/cart.service';
import { RestaurantService } from 'src/app/Services/RestaurantService/restaurant.service';



@Component({
  selector: 'restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
})
export class RestaurantComponent implements OnInit {

  restaurantName!: string;

  menuItems: MenuItem[] = [];

  selectedItems: CartItems[] = [];
  totalCost: number = 0;

  constructor(private cartservice: CartService, private restaurantService: RestaurantService, private cartService: CartService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.restaurantName = this.activeRoute.snapshot.params['name'];
    this.menuItems = JSON.parse(localStorage.getItem("menuList")!);

    console.log(this.menuItems);

    this.selectedItems = JSON.parse(localStorage.getItem("cartItems")!);

    if (this.selectedItems !== null) {
      this.totalCost = JSON.parse(localStorage.getItem('totalPrice')!);
    }
  }

  getSelectedCount(name: string): number {
    this.cartService.getCartItems().subscribe(items => this.selectedItems = items);

    const item = this.selectedItems.filter(item => item.menuItem.name === name);

    var count = 0;

    if (item.length > 0) {
      count = item[0].count;
    }

    return count;
  }


  goToCart() {
    this.router.navigate(['/basket']);
  }

  removeItem(item: MenuItem) {
    this.cartService.getCartItems().subscribe(items => this.selectedItems = items);

    const isPresent = this.selectedItems.filter(it => it.menuItem.name === item.name).length > 0 ? true : false;

    console.log("ispresent ", isPresent);
    
    if (isPresent) {
      this.cartService.removeFromCart(item);
      this.totalCost -= item.price;
    }
  }

  addToCart(item: MenuItem) {
    this.cartService.addToCart(item);

    this.totalCost += item.price;
  }


}
