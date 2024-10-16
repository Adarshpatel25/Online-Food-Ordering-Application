import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/User';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  password!: string;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
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
          Validators.minLength(6),
          this.passwordValidator
        ]
      ],
      confirmPassword: [
        '',
      ],
      role: ['', Validators.required] // Role selection
    });
  }

  confirmPasswordValidator() : boolean {
    if(this.registerForm.value.password === this.registerForm.value.confirmPassword) {
      return true;
    }
    return false;
  }

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
    const value: string = control.value;

    if (value.indexOf('@') === -1 || value.indexOf('.') === -1) {
      return { 'emailPattern': true };
    }

    return null;
  }

  onSubmit() {

    

    if (this.registerForm.valid) {
      console.log('Registering user with:', this.registerForm.value);

      const storedUsersJSON = localStorage.getItem("usersList");


      if (storedUsersJSON == null) {
        localStorage.setItem("usersList", JSON.stringify([]));
      }

      var storedUsers: User[] = [];
      if (storedUsersJSON) {
        storedUsers = JSON.parse(storedUsersJSON);
        console.log("Stored users ", storedUsers);
      }

      const userExists: boolean = storedUsers.filter(usr => (usr.email === this.registerForm.value.email)).length > 0 ? true : false;

      console.log("User exists ", userExists);

      if (!userExists) {
        localStorage.setItem("usersList", JSON.stringify([...storedUsers, new User(this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.role, [])]));


        alert('Registration successful! Please login.');
        console.log('Registration successful. Redirecting to login page.');
        this.router.navigate(['/login']);
      }
      else {
        alert('User already Registered!');
      }
    } else {
      console.log('Registration form is invalid:', this.registerForm.errors);
      alert('Please fill in the form correctly.');
    }
  }
}
