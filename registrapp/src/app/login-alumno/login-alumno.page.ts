import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../servicios/api.service';

@Component({
  selector: 'app-login-alumno',
  templateUrl: './login-alumno.page.html',
  styleUrls: ['./login-alumno.page.scss'],
})
export class LoginAlumnoPage implements OnInit {

  hide = true;
  private isLoggedIn: boolean = false;
  user = {
    nombre: '',
    password: '',
  }
  isLoading = false;

  mostrarMensaje: boolean = false;

  constructor(private apiService: ApiService, private router: Router) { }

  login() {
    this.isLoading = true;

    this.apiService.buscarUsuario(this.user.nombre, this.user.password).subscribe(
      (response) => {
        if (this.verificarCredenciales(response)) {
          localStorage.setItem('ingresado', 'true');
          this.IrAlHome();
        } else {
          console.log('Credenciales incorrectas');
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
      },
      () => {
        this.isLoading = false; // Finaliza el estado de carga cuando la solicitud termina
      }
    );
  }

  verificarCredenciales(response: any): boolean {
    return response.User === this.user.nombre && response.password === this.user.password;
  }

  bloquearBtn(): boolean {
    return this.user.nombre.length < 3 || this.user.password.length != 4;
  }

  async IrAlHome() {

    let navigationExtras: NavigationExtras = {
      state: {
        nombreUsuario: this.user.nombre
      }
    }
    this.router.navigate(['/home'], navigationExtras);
  }

  recovery() {
    this.router.navigate(['/recovery'])
  }

  validarUsername(user: string): string | null {
    if (user.length < 3 || user.length > 8) {
      return 'El nombre de usuario debe tener entre 3 y 8 caracteres.';
    }
    return null;
  }

  validarPassword(pass: string): string | null {
    if (pass.length !== 4) {
      return 'La contraseña debe tener 4 caracteres.';
    }
    return null;
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }


  ngOnInit() {
  }


}
