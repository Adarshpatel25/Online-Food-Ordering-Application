import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './Components/basket/basket.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { RatingComponent } from './Components/rating/rating.component';
import { RegisterComponent } from './Components/register/register.component';
import { RestaurantPageComponent } from './Components/restaurant-page/restaurant-page.component';
import { RestaurantComponent } from './Components/restaurant/restaurant.component';
import { ReviewComponent } from './Components/review/review.component';
import { ProfileComponent } from './Components/profile/profile/profile.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { AuthGuardService } from './Guards/auth-guard.service';
import { ShippingAddressComponent } from './Components/shipping-address/shipping-address.component';



const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'restaurantPage', component: RestaurantPageComponent, canActivate:[AuthGuardService]  },
  { path: 'reviews', component: ReviewComponent, canActivate:[AuthGuardService]  },
  { path: 'basket', component: BasketComponent, canActivate:[AuthGuardService] },
  { path: 'rating', component: RatingComponent, canActivate:[AuthGuardService]  },
  {path: 'profilePage', component: ProfileComponent, canActivate:[AuthGuardService] },
  { path: 'restaurant', component: RestaurantComponent, canActivate:[AuthGuardService] },
  {path: 'orders', component: OrdersComponent, canActivate:[AuthGuardService] },
  { path: 'shipping-address', component: ShippingAddressComponent, canActivate: [AuthGuardService] },
  { path: '**', component: NotFoundComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// one doubt that what was the difference between these two

// { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect root to /home
// { path: '', component: HomeComponent },