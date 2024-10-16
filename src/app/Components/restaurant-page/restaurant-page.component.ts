import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'src/app/Model/MenuItem';
import { Restaurant } from 'src/app/Model/Restaurant';
import { RestaurantService } from 'src/app/Services/RestaurantService/restaurant.service';


@Component({
  selector: 'app-restaurant-page',
  templateUrl: './restaurant-page.component.html',
  styleUrls: ['./restaurant-page.component.css']
})
export class RestaurantPageComponent implements OnInit {
  basket: MenuItem[] = []; 
  menu: MenuItem[] = [];

  restaurantList!: Restaurant[];

  constructor(private router: Router, private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    const loggedInUser = localStorage.getItem('currentUser');

    if(!loggedInUser) {
      this.router.navigate(['/home']);
    }

    this.restaurantList = this.restaurantService.getRestaurantList();
  }

  addToBasketAndNavigate(restaurant: any) {

    this.basket.push(restaurant);

    localStorage.setItem('cart', JSON.stringify(this.basket));

    this.router.navigate(['/basket']);
  }

  navigateToMenu(restaurant: Restaurant) {
    localStorage.setItem('selectedRestaurant', JSON.stringify(restaurant));

    // Navigate to the menu-item page
    this.router.navigate(['/restaurant', {'name': restaurant.name}]);
  }
}
