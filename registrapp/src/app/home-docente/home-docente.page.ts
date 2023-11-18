import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../servicios/api.service';


@Component({
  selector: 'app-home-docente',
  templateUrl: './home-docente.page.html',
  styleUrls: ['./home-docente.page.scss'],
})
export class HomeDocentePage implements OnInit {

  idProfesor : any;
  nombreUsuario: string = '';
  cursos: any[] = [];

  public qrdata: String = '';
  value = '65557bc3f2aa3ad1a160776f'; //curso id


  constructor(private router: Router, private apiService: ApiService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.nombreUsuario = navigation.extras.state['nombre'];
      this.idProfesor = navigation.extras.state['id'];
    }
  }

  verCursos(){
    this.apiService.getCursos(this.idProfesor).subscribe(
      (response) => {
        console.log('Courses:', response.cursos);
    }, (error) => {
      console.log(error);
    }
    );
  }

  verDetalleCurso(cursoId: number) {
    let setData: NavigationExtras = {
      state: {
        idProfesor: this.idProfesor,
        idCurso : cursoId        
      }
    };
    this.router.navigate(['/curso'],setData);
}

  
  
  
  ngOnInit(): void {
    console.log(this.idProfesor);
    console.log(this.nombreUsuario);
  }

}
