import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HomeDocentePage } from './home-docente.page';
import { ApiService } from '../servicios/api.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

describe('Home Docente', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomeDocentePage],
      providers: [
        ApiService,
        Router
      ],
      imports: [
        HttpClientModule,
        IonicModule
      ]
    }).compileComponents();
  }));

  it('Existencia de la pagina', () => {
    const fixture = TestBed.createComponent(HomeDocentePage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  })
});
