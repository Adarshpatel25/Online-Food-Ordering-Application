import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { User } from 'src/app/Model/User';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input("navStatus") navStatus = "";

  loggedInUser!: User;

  loggedIn! : boolean;


  constructor(private router: Router) {

  }
  
  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem("currentUser")!);
    this.loggedIn = this.loggedInUser !== null;

    console.log("Current Nav Status: " + this.navStatus);
    
  }


    logout() {
      
      localStorage.removeItem("currentUser");

      this.router.navigate(['/home']); // Redirect to login page
      
    }

    goBack() : void {
      this.router.navigate(['/restaurantPage']);
    }

}
