import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './Components/basket/basket.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HeaderComponent } from './Components/header/header.component';
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
import { ShippingAddressComponent } from './Components/shipping-address/shipping-address.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    RatingComponent,
    ReviewComponent,
    BasketComponent,
    RestaurantComponent,
    RestaurantPageComponent,
    ProfileComponent,
    OrdersComponent,
    ShippingAddressComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
