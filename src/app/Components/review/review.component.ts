import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/User';


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  reviews: { text: string; author: string }[] = [];
  newReview: string = '';
  errorMessage: string = '';
  currentUser!: User;

  constructor(private router: Router) {} // Injecting the Router service

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);

    this.loadReviews();
  }

  // Load reviews from localStorage
  loadReviews(): void {
    const storedReviews = localStorage.getItem('reviewList');
    if (storedReviews) {
      this.reviews = JSON.parse(storedReviews);
    }
  }


  // Method to submit a new review
  submitReview(): void {
    this.errorMessage = ''; // Reset error message

    if (!this.newReview.trim()) {
      this.errorMessage = 'Review cannot be empty.';
      console.log('Validation failed: Review cannot be empty.');
      return;
    }

    const newReviewEntry = { 
      text: this.newReview.trim(), 
      author: this.currentUser.email
    };

    this.reviews.push(newReviewEntry);
    this.newReview = ''; // Clear the textarea after submission

    // Save updated reviews to localStorage
    localStorage.setItem('reviewList', JSON.stringify(this.reviews));
    console.log('New review submitted:', newReviewEntry);

    this.router.navigate(['/restaurantPage']);
  }


}
