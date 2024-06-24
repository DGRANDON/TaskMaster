import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authenticated = false;

  constructor() { }

  login(email: string, password: string): Promise<boolean> {
    // Simulando autenticación con una promesa (debería ser una llamada a una API real)
    return new Promise((resolve) => {
      if (email === 'test@example.com' && password === 'password') {
        this.authenticated = true;
        resolve(true);
      } else {
        this.authenticated = false;
        resolve(false);
      }
    });
  }

  logout(): void {
    this.authenticated = false;
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }
}
