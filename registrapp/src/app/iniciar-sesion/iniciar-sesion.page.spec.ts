import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { IniciarSesionPage } from './iniciar-sesion.page';
import { ApiService } from '../servicios/api.service';
import { AlertController, IonicModule } from '@ionic/angular';
import { GuardGuard } from '../guard/guard.guard';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

describe('Iniciar Sesión', () => {
  let component: IniciarSesionPage;
  let fixture: ComponentFixture<IniciarSesionPage>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRoute: ActivatedRoute; 

  beforeEach(waitForAsync(() => {
    const apiSpy = jasmine.createSpyObj('ApiService', ['login']);

    TestBed.configureTestingModule({
      declarations: [IniciarSesionPage],
      providers: [
        { provide: ApiService, useValue: apiSpy },
        
        AlertController,
        GuardGuard,
        Router,
        { provide: ActivatedRoute, useValue: {} }
      ],
      imports: [
        HttpClientModule,
        IonicModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatIconModule,
        BrowserAnimationsModule,
        FormsModule,
        RouterModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IniciarSesionPage);
    component = fixture.componentInstance;
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  }));

  it('Existencia de la pagina', () => {
    expect(component).toBeTruthy();
  });

  it('Existencia del servicio', () => {
    expect(apiServiceSpy).toBeTruthy();
  });

  it('login valida usuario', () => {

    const mockResponse = {
      usuario: {
        _id: '6567a721ce533e845f605e3f',
        nombre: 'Cindy Contador',
        user: 'ci.contador',
        correo: 'ci.contador@duocuc.cl',
        perfil: 1
      }
    };

    apiServiceSpy.login.and.returnValue(of(mockResponse));

    component.user = { nombre: 'ci.contador', password: 'duoc' };
    component.login();

    fixture.detectChanges();

    expect(apiServiceSpy.login).toHaveBeenCalledWith('ci.contador', 'duoc');

    expect(component.user.nombre).toEqual(mockResponse.usuario.user);
  });

  it('login verifica perfil docente', () => {
    const mockResponseDocente = {
      usuario: {
        _id: '6567a721ce533e845f605e3f',
        nombre: 'Cindy Contador',
        user: 'ci.contador',
        correo: 'ci.contador@duocuc.cl',
        perfil: 1
      }
    };

    apiServiceSpy.login.and.returnValue(of(mockResponseDocente));

    component.user = { nombre: 'ci.contador', password: 'duoc' };
    component.login();

    fixture.detectChanges();

    expect(apiServiceSpy.login).toHaveBeenCalledWith('ci.contador', 'duoc');
    expect(mockResponseDocente.usuario.perfil).toEqual(1)

  });

  it('login verifica perfil alumno', () => {
    const mockResponseDocente = {
      usuario: {
        _id: '6567a913ce533e845f605e4f',
        nombre: 'a',
        user: 'a',
        correo: 'a@duocuc.cl',
        perfil: 2
      }
    };

    apiServiceSpy.login.and.returnValue(of(mockResponseDocente));

    component.user = { nombre: 'a', password: 'duoc' };
    component.login();

    fixture.detectChanges();

    expect(apiServiceSpy.login).toHaveBeenCalledWith('a', 'duoc');
    expect(mockResponseDocente.usuario.perfil).toEqual(2)

  });
});
