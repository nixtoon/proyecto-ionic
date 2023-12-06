import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IniciarSesionPage } from './iniciar-sesion.page';
import { ApiService } from '../servicios/api.service';
import { AlertController, IonicModule } from '@ionic/angular';
import { GuardGuard } from '../guard/guard.guard';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

describe('Iniciar Sesión', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [IniciarSesionPage],
      providers: [
        ApiService,
        AlertController,
        GuardGuard,
        Router
      ],
      imports: [
        HttpClientModule,
        IonicModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatIconModule
      ]
    }).compileComponents();
  }));

  it('Existencia de la pagina', () => {
    const fixture = TestBed.createComponent(IniciarSesionPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  })
});


