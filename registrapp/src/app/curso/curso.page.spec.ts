import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CursoPage } from './curso.page';
import { ApiService } from '../servicios/api.service';
import { QrCodeModule } from 'ng-qrcode';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

describe('pagina de cursos', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CursoPage],
      providers: [
        ApiService,
        Router
      ],
      imports: [
        HttpClientModule,
        IonicModule,
        QrCodeModule,
      ]
    }).compileComponents();
  }));

  it('Existencia de la Pagina', () => {
    const fixture = TestBed.createComponent(CursoPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  })
})
