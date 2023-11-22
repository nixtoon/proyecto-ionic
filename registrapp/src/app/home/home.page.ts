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
  idCurso: string = '';
  idAlumno: string = '';
  nombreUsuario: string = '';

  constructor(private alertController: AlertController, private apiService: ApiService, private activatedRoute: ActivatedRoute, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.idAlumno = navigation.extras.state['_id'];
      this.nombreUsuario = navigation.extras.state['nombre'];
    }
  }
  ngOnInit(): void {
    console.log(this.idAlumno);
    console.log(this.idCurso);
  }

  // funcion para escanear QR
  async scan(): Promise<void> {
    try {
      this.installGoogleBarcodeScanner()
      const { barcodes } = await BarcodeScanner.scan({
        formats: [BarcodeFormat.QrCode],
      });

      if (barcodes && barcodes.length > 0) {
        // Iterar sobre los códigos de barras  
        for (let barcode of barcodes) {
          this.idCurso = barcode.rawValue;
          console.log('Datos escaneados:', this.idCurso);
          this.showScanResultAlert();
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
  installGoogleBarcodeScanner(){
    const installGoogleBarcodeScannerModule = async () => {
      await BarcodeScanner.installGoogleBarcodeScannerModule();
    };
  }

  // registro de asistencia en la BD
  registroAsistencia() {
    if (!this.idCurso) {
      this.noData();
      return;
    }
  
    const data = {
      alumno: this.idAlumno,
      curso: this.idCurso,
      presente: true,
    };
  
    console.log('Data:', data);
  
    this.apiService.registrarAsistencia(data).subscribe(
      (success) => {
        console.log('Success:', success);
        this.registroExitoso();
        this.router.navigate(['/inicio']);
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

}
