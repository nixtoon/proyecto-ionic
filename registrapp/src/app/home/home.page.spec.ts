import { TestBed, waitForAsync } from '@angular/core/testing';
import { HomePage } from './home.page';
import { ApiService } from '../servicios/api.service';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

describe('Home alumno', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      providers: [
        ApiService,
        BarcodeScanner,
        AlertController,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 'dummyId' 
              }
            }
          }
        },
        Router
      ],
      imports: [
        HttpClientModule,
        IonicModule
      ]
    }).compileComponents();
  }));

  it('Existencia de la pagina', () => {
    const fixture = TestBed.createComponent(HomePage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  })
});