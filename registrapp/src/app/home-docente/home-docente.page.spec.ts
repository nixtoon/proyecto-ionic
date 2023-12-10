import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../servicios/api.service';
import { Router } from '@angular/router';
import { HomeDocentePage } from './home-docente.page';

describe('HomeDocentePage', () => {
  let fixture: ComponentFixture<HomeDocentePage>;
  let component: HomeDocentePage;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        IonicModule
      ],
      declarations: [HomeDocentePage],
      providers: [
        ApiService,
        Router
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeDocentePage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  }));

  it('Existencia de la pagina', () => {
    expect(component).toBeTruthy();
  });

  it('debería navegar a la ruta /curso con los datos correctos', () => {
    const navigateSpy = spyOn(router, 'navigate');

    const cursoId = 1;
    component.irDetalleCurso(cursoId);

    const expectedData = {
      state: {
        idCurso: cursoId,
        correo: component.correo,
      },
    };

    expect(navigateSpy).toHaveBeenCalledWith(['/curso'], expectedData);
  });
});
