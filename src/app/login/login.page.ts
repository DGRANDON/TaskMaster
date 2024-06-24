import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).then((res: boolean) => {
        if (res) {
          this.router.navigateByUrl('/dashboard');
        } else {
          this.errorMessage = 'Correo o contraseña incorrectos';
        }
      }).catch((err: any) => {
        console.error(err); // Opcional: para registro de errores
        this.errorMessage = 'Ocurrió un error al iniciar sesión';
      });
    }
  }

  goToRegister() {
    this.router.navigateByUrl('/register');
  }
}




