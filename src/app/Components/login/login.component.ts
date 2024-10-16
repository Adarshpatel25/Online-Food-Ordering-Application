import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/User';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          this.emailValidator
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          this.passwordValidator
        ]
      ],
      role: ['', Validators.required] // Role selection
    });
  }

  // Custom password validator
  passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;

    console.log();

    if (/\s/.test(value)) {
      return { 'passwordContainsSpace': true };
    }
    if (/^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/.test(value)) {
      return { 'passwordPattern': true };
    }


    return null;
  }

  emailValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value : string = control.value;

    if(value.indexOf('@') === -1 || value.indexOf('.') === -1) {
      return {'emailPattern': true};
    }
  
    return null;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      console.log('Login form is invalid:s', this.loginForm.errors);
      alert('Please fill in the form correctly.');
      return;
    }
    
    // Retrieve registered user data from localStorage
    const registeredUsersListJSON = localStorage.getItem('usersList');

    var registeredUsersList: User[] = [];
    if (registeredUsersListJSON) {
      registeredUsersList = JSON.parse(registeredUsersListJSON);
    }
    if (registeredUsersList.length === 0) {
      console.log('No registered user found.');
      alert('No registered user found. Please register first.');
      return;
    }

    // Parse the stored user data
    const storedUser = registeredUsersListJSON;

    
    // Compare entered credentials with stored data
    const authenticated: boolean = registeredUsersList.filter(usr => (usr.email === this.loginForm.value.email && usr.password === this.loginForm.value.password
    )).length > 0 ? true : false;
    if (
      authenticated) {
      console.log('Login successful. User:', this.loginForm.value);

      // Store the current logged-in user in localStorage
      localStorage.setItem('currentUser', JSON.stringify(this.loginForm.value));

      // Role-based redirection
      if (this.loginForm.value.role === 'admin') {
        this.router.navigate(['/admin-dashboard']);
      } else {

        alert("Login Success!");
        // this.router.navigate(['/student-dashboard']);
        this.router.navigate(['/restaurantPage']);
      }
    } else {
      console.log('Invalid login credentials.');
      alert('Invalid login credentials. Please check your email and password.');
    }
  }
}
