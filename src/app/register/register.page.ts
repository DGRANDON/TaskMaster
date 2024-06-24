import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder, // Inyectar FormBuilder
    private router: Router // Inyectar Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  register() {
    if (this.registerForm.valid) {
      // Procesar la información del formulario de registro aquí
      console.log('Form Submitted', this.registerForm.value);
      // Redirigir al usuario a la página del tablero
      this.router.navigateByUrl('/dashboard');
    } else {
      console.log('Form is not valid');
    }
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }
}





