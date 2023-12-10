import { ComponentFixture, TestBed, waitForAsync, tick, fakeAsync } from '@angular/core/testing';
import { RecoveryPage } from './recovery.page';
import { ApiService } from '../servicios/api.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { of, throwError } from 'rxjs';

describe('Recuperar Password', () => {
  let fixture: ComponentFixture<RecoveryPage>;
  let component: RecoveryPage;
  let apiService: ApiService;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RecoveryPage],
      providers: [ApiService, Router],
      imports: [HttpClientModule, IonicModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoveryPage);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    router = TestBed.inject(Router);
  });

  it('Existencia de la página', () => {
    expect(component).toBeTruthy();
  });

  it('debería enviar solicitud con éxito y redirigir a /iniciar-sesion', fakeAsync(() => {
    const recoverySpy = spyOn(apiService, 'recovery').and.returnValue(of(true));
    const navigateSpy = spyOn(router, 'navigate');

    component.enviarSolicitud();
    tick();

    expect(recoverySpy).toHaveBeenCalledWith(component.correo);
    expect(component.showSpinner).toBeTrue();
    expect(component.mensaje).toBe('Solicitud enviada con éxito. Redirigiendo...');

    tick(3000);

    expect(component.showSpinner).toBeFalse();
    expect(component.mensaje).toBe('');
    expect(navigateSpy).toHaveBeenCalledWith(['/iniciar-sesion']);
  }));

  it('debería manejar el error y mostrar el mensaje de error', fakeAsync(() => {
    spyOn(apiService, 'recovery').and.returnValue(throwError('Error en la solicitud'));

    component.enviarSolicitud();
    tick();

    expect(component.showSpinner).toBeFalse();
    expect(component.mensaje).toBe('Error');
  }));
});
