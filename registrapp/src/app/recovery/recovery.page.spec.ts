import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RecoveryPage } from './recovery.page';
import { ApiService } from '../servicios/api.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

describe('Recuperar Password', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RecoveryPage],
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
    const fixture = TestBed.createComponent(RecoveryPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  })
});
