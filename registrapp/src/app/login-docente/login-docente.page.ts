import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../servicios/api.service';
import { AlertController } from '@ionic/angular';
import { usuario } from '../modelo/usuario';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GuardGuard } from '../guard/guard.guard';

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

  private typeuser!: usuario;

  constructor(private apiService: ApiService, private router: Router, private alertController: AlertController, private auth: GuardGuard) { }

  usuario = new FormGroup({
    user: new FormControl('',[Validators.required, Validators.minLength(4),Validators.maxLength(20)]),
    pass: new FormControl('',[Validators.required, Validators.minLength(4),Validators.maxLength(20)]),
  });

  login() {

    this.apiService.login(this.user.nombre, this.user.password).subscribe(
      (response) => {
        console.log(response);
        if (response) {
          this.typeuser = response;
          console.log(this.typeuser);
          this.showSpinner = true;
          let setData: NavigationExtras = {
            state: {
              id: this.typeuser.id,
              user: this.typeuser.user,
              correo: this.typeuser.correo,
              nombre: this.typeuser.nombre,
              tipoPerfil: this.typeuser.tipoPerfil
            }
          };
          setTimeout(() => {
            this.showSpinner = false;
            console.log(setData)
          }, 3000);
          if (this.typeuser.tipoPerfil === 1) {
            this.auth.setAuthenticationStatus(true);
            this.router.navigate(['/home-docente'], setData);
          }

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
