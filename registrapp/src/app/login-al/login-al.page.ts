import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../servicios/api.service';
import { AlertController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GuardGuard } from '../guard/guard.guard';

@Component({
  selector: 'app-login-al',
  templateUrl: './login-al.page.html',
  styleUrls: ['./login-al.page.scss'],
})
export class LoginAlPage implements OnInit {


  hide = true;
  user = {
    nombre: '',
    password: '',
  }
  showSpinner: boolean = false;

  constructor(private apiService: ApiService, private router: Router, private alertController: AlertController, private auth: GuardGuard) { }
  usuario = new FormGroup({
    user: new FormControl('',[Validators.required, Validators.minLength(4),Validators.maxLength(20)]),
    pass: new FormControl('',[Validators.required, Validators.minLength(4),Validators.maxLength(20)]),
  });

  login() {

    this.apiService.loginAlumno(this.user.nombre, this.user.password).subscribe(
      (response) => {
        console.log(response);
        if (response) {
          console.log(response);
          this.showSpinner = true;
          let setData: NavigationExtras = {
            state: {
              _id: response.usuario._id,
              nombre: response.usuario.nombre,
              user: response.usuario.user,
              correo: response.usuario.correo,
            }
          };
          setTimeout(() => {
            this.showSpinner = false;
            console.log(setData)
            this.auth.setAuthenticationStatus(true);
            this.router.navigate(['/home'], setData);
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
