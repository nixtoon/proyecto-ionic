import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../servicios/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login-docente',
  templateUrl: './login-docente.page.html',
  styleUrls: ['./login-docente.page.scss'],
})
export class LoginDocentePage implements OnInit {

  hide = true;
  user = {
    nombre: '',
    password: '',
  }
  showSpinner: boolean = false;

  constructor(private apiService: ApiService, private router: Router, private alertController: AlertController) { }

  login() {

    this.apiService.buscarDocente(this.user.nombre, this.user.password).subscribe(
      (response) => {
        if (response) {
          localStorage.setItem('ingresado', 'true');
          this.showSpinner = true;
          console.log(response);
          setTimeout(() => {
            this.showSpinner = false;
            this.IrAlHome();
          }, 3000);
        } 
      },
      (error) => {
        this.showSpinner = true;
        console.error('Error en la solicitud:', error);
        setTimeout(() => {
          this.showSpinner = false;
          this.credencialesIncorrectas();
        }, 3000); 
      }
    );
  }

  verificarCredenciales(response: any): boolean {
    return response.nombre_usuario === this.user.nombre && response.password === this.user.password;
  }

  // mensaje al usuario
  async credencialesIncorrectas() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Nombre de usuario o contraseña incorrectos',
      buttons: ['OK']
    });

    await alert.present();
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
    this.router.navigate(['/home-docente'], navigationExtras);
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
