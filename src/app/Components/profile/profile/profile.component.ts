import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Model/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user!: User;


  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser')!);
  }


}
