import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Model/Order';
import { User } from 'src/app/Model/User';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[] = [];


  ngOnInit(): void {     
    const usersList = JSON.parse(localStorage.getItem('usersList')!);

    const currentUser = JSON.parse(localStorage.getItem('currentUser')!);

    this.orders = usersList.filter((usr : User) => usr.email === currentUser.email)[0].orders;

  }
      

  parseMenuItems(order: Order) : string {
    let menuItems = '';

    for(var item of order.orderedItems) {
      menuItems += ` ${item.menuItem.name} * ${item.count}`;
    }


    return menuItems;
  }


}
