import { Component, ElementRef, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CartItems } from 'src/app/Model/CartItems';
import { MenuItem } from 'src/app/Model/MenuItem';
import { CartService } from 'src/app/Services/CartService/cart.service';



@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {



  cartItems: CartItems[] = [];


  totalCost: number = 0;


  constructor(private cartService: CartService, private router: Router, private renderer: Renderer2) { }

  ngOnInit(): void {

    this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

    this.totalCost = JSON.parse(localStorage.getItem('totalPrice')!);
    
  }

  placeOrder() {
    this.router.navigate(['/shipping-address']);
  }


  getSelectedCount(name: string): number {
    this.cartService.getCartItems().subscribe(items => this.cartItems = items);

    const item = this.cartItems.filter(item => item.menuItem.name === name);

    var count = 0;

    if (item.length > 0) {
      count = item[0].count;
    }

    return count;
  }

  removeItem(item: MenuItem) {
    this.cartService.getCartItems().subscribe(items => this.cartItems = items);

    const isPresent = this.cartItems.filter(item => item.menuItem.name === item.menuItem.name).length > 0 ? true : false;

    if (isPresent) {
      this.cartService.removeFromCart(item);
      this.totalCost -= item.price;
    }
  }

  addToCart(item: MenuItem) {
    this.cartService.addToCart(item);

    this.totalCost += item.price;
  }


  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
    this.totalCost = 0;
    localStorage.removeItem('totalPrice');
    localStorage.removeItem('selectedRestaurant');
  }

  addMoreItems() {
    const selectedRestaurant = JSON.parse(localStorage.getItem('selectedRestaurant')!);

    if (selectedRestaurant) {
      this.router.navigate(['/restaurant', { 'name': selectedRestaurant.name }]);
    }
    else {
      this.router.navigate(['/restaurantPage']);
    }
  }

  navigateToHome() {
    this.router.navigate(['/restaurantPage']);
  }

  calculateTotalCost() {
    this.totalCost = this.cartService.calculateTotalPrice();
  }
}
