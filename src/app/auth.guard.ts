import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      // Redirigir al dashboard si está autenticado
      return this.router.createUrlTree(['/dashboard']);
    } else {
      // Redirigir a la página de inicio de sesión si no está autenticado
      return this.router.createUrlTree(['/login']);
    }
  }
}


