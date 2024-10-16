import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartItems } from 'src/app/Model/CartItems';
import { CartService } from 'src/app/Services/CartService/cart.service';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.css']
})
export class ShippingAddressComponent implements OnInit {

  @ViewChild("toastRef") toastRef!: ElementRef<HTMLDivElement>;

  orderForm: FormGroup;
  userEmail: string = ''; // To store current user's email
  addressExists: boolean = false; // Flag to check if address already exists

  cartItems: CartItems[] = [];
  totalCost: number = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private cartService: CartService,
    private renderer: Renderer2
  ) {
    this.orderForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      mobile: ['', [Validators.required, Validators.pattern('[- +()0-9]{10}')]],
      address1: ['', Validators.required],
      address2: [''],
      landmark: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });

    // Retrieve user email from localStorage
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.userEmail = user?.email || '';
    }
  }

  ngOnInit(): void {
    this.loadShippingAddress();
    this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

    this.totalCost = JSON.parse(localStorage.getItem('totalPrice')!);
  }

  loadShippingAddress(): void {
    if (this.userEmail) {
      const storedAddress = localStorage.getItem(`shippingAddress_${this.userEmail}`);
      if (storedAddress) {
        this.orderForm.patchValue(JSON.parse(storedAddress));
      }
    }
  }

  onSubmit(): void {
    if (this.orderForm.valid && !this.addressExists) {
      if (this.userEmail) {
        localStorage.setItem(`shippingAddress_${this.userEmail}`, JSON.stringify(this.orderForm.value));
        this.addressExists = true; // Update the flag
      }

      this.totalCost = JSON.parse(localStorage.getItem('totalPrice')!);

      this.cartService.placeOrder(this.cartItems, this.totalCost);

      this.renderer.addClass(this.toastRef.nativeElement, 'show');

      setTimeout(() => {
        this.renderer.removeClass(this.toastRef.nativeElement, 'show');


      }, 1500);


      this.snackBar.open('Thank you for providing your shipping address. You can now review and place your order.', 'Close', {
        duration: 3000,
      }).afterDismissed().subscribe(() => {
        this.router.navigate(['/rating']);
      });
    }
  }

  onCancel(): void {
    console.log('Order cancelled');
    this.router.navigate(['/']); // Redirect to home or previous page
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/home']);
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }


}
