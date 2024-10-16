import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router for navigation


@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  stars = Array(5).fill(0).map((_, index) => ({ value: index + 1 }));
  selectedRating: number = 1;
  comments: string = '';
  userInfo: any = null; // To store logged-in user information
  currentUser:{ name: String; } | undefined;

  constructor(private router: Router) {} // Inject Router service

  ngOnInit() {
    this.loadUserInfo();
    this.checkUserAuthentication();
    this.loadRating();
  }

  setRating(value: number) {
    this.selectedRating = value;
  }

  submitRating() {
    if (this.userInfo) {
      // Handle form submission
      console.log('Rating:', this.selectedRating);
      console.log('Comments:', this.comments);

      // Store the rating in localStorage
      const userRating = {
        rating: this.selectedRating,
        comments: this.comments
      };
      localStorage.setItem('userRating', JSON.stringify(userRating));

      // Clear form fields
      this.selectedRating = 1;
      this.comments = '';

      this.router.navigate(['/reviews']);
    } else {
      console.log('You must be logged in to submit a rating.');
      alert('Please log in to submit a rating.'); // Notify the user to log in
    }
  }

  // Load rating from localStorage if available
  loadRating() {
    if (this.userInfo) {
      const storedRating = localStorage.getItem('userRating');
      if (storedRating) {
        const userRating = JSON.parse(storedRating);
        this.selectedRating = userRating.rating;
        this.comments = userRating.comments;
      }
    }
  }

  loadUserInfo() {
    const storedUserInfo = localStorage.getItem('currentUser');
    if (storedUserInfo) {
      this.userInfo = JSON.parse(storedUserInfo);
      console.log('User info loaded:', this.userInfo);
    } else {
      console.log('No user info found in localStorage.');
      this.userInfo = null;
    }
  }


  checkUserAuthentication() {
    if (!this.userInfo) {
      console.log('User is not authenticated. Redirecting to login page.');
      alert('You must log in to view this page.');
      this.router.navigate(['/login']); // Redirect to login page if user is not authenticated
    } else {
      console.log('User is authenticated:', this.userInfo);
    }
  }

  // Logout method
  logout() {
    localStorage.removeItem('userRating');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('currentUser');
    console.log('User logged out. Rating and user information removed from localStorage.');
    
    // Navigate to the home page
    this.router.navigate(['/home']);
  }
}
