import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../servicios/api.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.page.html',
  styleUrls: ['./recovery.page.scss'],
})
export class RecoveryPage implements OnInit {


  correo: string = '';
  showSpinner: boolean = false; // Variable para controlar la visibilidad del spinner
  mensaje: string = ''; // Variable para el mensaje

  constructor(private router: Router, private apiService: ApiService) { }

  enviarSolicitud() {

    this.apiService.recovery(this.correo).subscribe(
      (response) => {
        console.log(response);
        if (response) {
          this.showSpinner = true;
          this.mensaje = 'Solicitud enviada con éxito. Redirigiendo...'; 

          // Simula un retraso de 3 segundos
          setTimeout(() => {
            // Desactiva el spinner
            this.showSpinner = false;
            this.mensaje = ''; // Limpia el mensaje
            // Redirige a la página de inicio de sesión (login)
            this.router.navigate(['/iniciar-sesion']);
          }, 3000);

        } else {
          this.mensaje = 'Error'       
        }
      });
  }
  
  ngOnInit() {
  
  }
}
