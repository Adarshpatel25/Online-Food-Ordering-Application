import { Injectable, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/Model/MenuItem';
import { Restaurant } from 'src/app/Model/Restaurant';


@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  restaurantList: Restaurant[] = [];

  menuList: MenuItem[] = [];

  // Static list of Restaurants for Initialiation during First run of this Application
  private restaurants = [
    new Restaurant("Italiano Cafe", "../assets/image/Italiano Cafe.jpg"),
    new Restaurant("Asha Tiffins", "../assets/image/Asha Tiffins.jpg"),
    new Restaurant("Rameshwaram Cafe", "../assets/image/Rameshwaram Cafe.jpg"),
    new Restaurant("Mc Donalds", "../assets/image/Mc D.jpg"),
    new Restaurant("Dominoz", "../assets/image/Dominoz.jpg"),
    new Restaurant("Paris Chain", "../assets/image/Paris Chain.jpg"),
  ];

  private menus = [
    new MenuItem(1, 'Sandwich', 'Delicious Veggie Corn Sandwich', 149,"../assets/image/sandwich.jpg"),
    new MenuItem(2, 'Burger', 'Veg Delight Burger', 199, "../assets/image/burger.jpg"),
    new MenuItem(3, 'Pizza', 'Italian Pizza', 349, "../assets/image/pizza.jpg"),
    new MenuItem(4, 'Burritos', 'Californian Burritos', 249, "../assets/image/burritos.jpg")
  ];

  constructor() { }

  getRestaurantList(): Restaurant[] {
    const restaurantsJSON = localStorage.getItem("restaurantList");
    if (restaurantsJSON === null) {
      localStorage.setItem("restaurantList", JSON.stringify(this.restaurants));
      localStorage.setItem("menuList", JSON.stringify(this.menus));
      this.restaurantList = this.restaurants;
    }
    else {
      this.restaurantList = JSON.parse(localStorage.getItem("restaurantList")!);
      this.menuList = JSON.parse(localStorage.getItem('menuList')!);
    }



    return this.restaurantList;
  }


}
