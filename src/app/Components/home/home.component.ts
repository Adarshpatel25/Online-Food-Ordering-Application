// home.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/User';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  currentUser!: User;

  constructor(private router: Router) { 


  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser")!);

    if(this.currentUser ) {
      this.router.navigate(['/restaurantPage']);
    }

  }

  onLogin() {
      console.log('Navigating to login page...');
      this.router.navigate(['/login']);

  }

  onRegister() {
    console.log('Navigating to register page...');
    this.router.navigate(['/register']);
  }
}
