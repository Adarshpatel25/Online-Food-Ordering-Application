import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) {

  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const currentUser = JSON.parse(localStorage.getItem("currentUser")!);

    if (currentUser) {
      return true;
    }
    
    this.router.navigate(['/login']);
    return false;

  }


}