import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../servicios/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  barcodes = [];
  datoEscaneado: string = '';
  idAlumno: string = '';
  nombreUsuario: string = '';

  idCurso: string = '';
  nombreCurso: string = '';
  seccionCurso: string = '';
  codigoCurso: string = '';

  correo: string = '';

  constructor(private alertController: AlertController, private apiService: ApiService, private activatedRoute: ActivatedRoute, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.idAlumno = navigation.extras.state['_id'];
      this.nombreUsuario = navigation.extras.state['nombre'];
    }
  }
  ngOnInit(): void {
    console.log(this.idAlumno);
    console.log(this.datoEscaneado);
  }

  // funcion para escanear QR
  async scan(): Promise<void> {
    try {
      this.installGoogleBarcodeScannerModule()
      const { barcodes } = await BarcodeScanner.scan({
        formats: [BarcodeFormat.QrCode],
      });

      if (barcodes && barcodes.length > 0) {
        // Iterar sobre los códigos de barras  
        for (let barcode of barcodes) {
          this.datoEscaneado = barcode.rawValue;
          console.log('Datos escaneados:', this.datoEscaneado);
          this.showScanResultAlert();
          this.separarDatos(this.datoEscaneado);
        }     
      } else {
        this.barcodes = [];
      }
    } catch (error) {
      console.error('Error durante el escaneo', error);
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('Error desconocido:', error);
      }
    }
  }

  // mensaje al usuario
  async showScanResultAlert() {
    const alert = await this.alertController.create({
      header: 'Escaneo exitoso',
      message: 'El código QR se ha escaneado correctamente.',
      buttons: ['OK']
    });

    await alert.present();
  }

  // mensaje al usuario
  async registroExitoso() {
    const alert = await this.alertController.create({
      header: 'Registro exitoso',
      message: 'Asistencia registrada correctamente',
      buttons: ['OK']
    });

    await alert.present();
  }

  // mensaje al usuario
  async noData() {
    const alert = await this.alertController.create({
      header: 'Primero escanea el QR',
      message: 'No es posible registrar tu asistencia',
      buttons: ['OK']
    });

    await alert.present();
  }

  // dependencia de google
  public async installGoogleBarcodeScannerModule() {
    await BarcodeScanner.installGoogleBarcodeScannerModule();
  }


  // registro de asistencia en la BD
  registroAsistencia() {
    if (!this.idCurso) {
      this.noData();
      return;
    }
  
    const data = {
      idAlumno: this.idAlumno,
      nombreAlumno: this.nombreUsuario,
      idCurso: this.idCurso,
      nombreCurso: this.nombreCurso,
      codigoCurso: this.codigoCurso,
      seccionCurso: this.seccionCurso,
      presente: true,
    };
  
    console.log('Data:', data);
  
    this.apiService.registrarAsistencia(data).subscribe(
      (success) => {
        console.log('Success:', success);
        this.registroExitoso();
        this.router.navigate(['/iniciar-sesion']);
        this.enviarCorreo();
      },
      (error) => {
        console.error('Error:', error);
  
        // Manejar errores específicos
        if (error.status === 404) {
          console.log('Alumno o curso no encontrado.');
        } else if (error.status === 400) {
          console.log('Error de validación al registrar la asistencia.');
        } else {
          console.log('Error al registrar la asistencia.');
        }
      }
    );
  }

  separarDatos(cadena: string) {
    const indices = [];
    let currentIndex = cadena.indexOf(';');
  
    while (currentIndex !== -1) {
      indices.push(currentIndex);
      currentIndex = cadena.indexOf(';', currentIndex + 1);
    }
  
    if (indices.length === 4) {
      this.idCurso = cadena.substring(0, indices[0]);
      this.nombreCurso = cadena.substring(indices[0] + 1, indices[1]);
      this.codigoCurso = cadena.substring(indices[1] + 1, indices[2]);
      this.seccionCurso = cadena.substring(indices[2] + 1, indices[3]);
      this.correo = cadena.substring(indices[3] + 1);
    } else {
      console.error('Número incorrecto de puntos y comas en la cadena.');
    }
  }

  enviarCorreo() {
    var destinatario = this.correo;
    var asunto = 'Registro de Asistencia ' + this.nombreCurso + ' ' + this.codigoCurso + ' ' + this.seccionCurso;
    var cuerpo = 'Registro de Asistencia Exitoso de ' + this.nombreUsuario;
  
    window.location.href = 'mailto:' + destinatario + '?subject=' + encodeURIComponent(asunto) + '&body=' + encodeURIComponent(cuerpo);
  }

}
