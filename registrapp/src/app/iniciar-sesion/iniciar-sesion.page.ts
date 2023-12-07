import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../servicios/api.service';
import { AlertController } from '@ionic/angular';
import { GuardGuard } from '../guard/guard.guard';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
})
export class IniciarSesionPage implements OnInit {

  hide = true;
  user = {
    nombre: '',
    password: '',
  }
  showSpinner: boolean = false;

  constructor(private apiService: ApiService, private router: Router, private alertController: AlertController, private auth: GuardGuard) { }

  login() {

    this.apiService.login(this.user.nombre, this.user.password).subscribe(
      (response) => {
        console.log(response);
        if (response) {
          this.showSpinner = true;
          let setData: NavigationExtras = {
            state: {
              _id: response.usuario._id,
              nombre: response.usuario.nombre,
              user: response.usuario.user,
              correo: response.usuario.correo,
              perfil: response.usuario.perfil
            }
          };
          setTimeout(() => {
            this.showSpinner = false;
            console.log(setData)
            if (response.usuario.perfil == 1) {
              this.auth.setAuthenticationStatus(true);
              this.router.navigate(['/home-docente'], setData);
            }
            if (response.usuario.perfil == 2) {
              this.auth.setAuthenticationStatus(true);
              this.router.navigate(['/home'], setData);
            }
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

  // mensaje al usuario
  async credencialesIncorrectas() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Nombre de usuario o contraseña incorrectos',
      buttons: ['OK']
    });

    await alert.present();
  }

  recovery() {
    this.router.navigate(['/recovery'])
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  ngOnInit() {
  }

}

