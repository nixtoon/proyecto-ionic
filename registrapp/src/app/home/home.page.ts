import { Component } from '@angular/core';
import { BarcodeScanner, BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../servicios/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  barcodes = [];
  scannedData: string = '';
  nombreUsuario: string = '';

  constructor(private alertController: AlertController, private apiService: ApiService, private activatedRoute: ActivatedRoute, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.nombreUsuario = navigation.extras.state['nombreUsuario'];
    }
  }

  // funcion para escanear QR
  async scan(): Promise<void> {
    try {
      const { barcodes } = await BarcodeScanner.scan({
        formats: [BarcodeFormat.QrCode],
      });

      if (barcodes && barcodes.length > 0) {
        // Iterar sobre los códigos de barras  
        for (let barcode of barcodes) {
          this.scannedData = barcode.rawValue;
          console.log('Datos escaneados:', this.scannedData);
          this.showScanResultAlert();
        }
      } else {
        this.barcodes = [];
      }
    } catch (error) {
      console.error('Error durante el escaneo', error);
      // Mostrar el mensaje de error en la consola
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

  registroAsistencia() {
    if (this.scannedData == '') {
      this.noData();
    } else {
      var data = {
        curso: this.scannedData,
        presente: true,
      }
      this.apiService.registrarAsistencia(data).subscribe((success) => {
        console.log(success);
        this.registroExitoso();
      }, error => {
        console.log(error);
      })
    }
    
  }

}
