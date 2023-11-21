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
  user: string='';
  correo: string = '';
  cursos: any[] = [];

  constructor(private router: Router, private apiService: ApiService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.nombreUsuario = navigation.extras.state['nombre'];
      this.idProfesor = navigation.extras.state['_id'];
      this.user = navigation.extras.state['user'];
      this.correo = navigation.extras.state['correo'];

    }
  }

  irDetalleCurso(cursoId: number) {
    let setData: NavigationExtras = {
      state: {
        idCurso : cursoId,      
      }
    };
    this.router.navigate(['/curso'],setData);
  }

  
  
  
  ngOnInit(): void {
    this.apiService.getCursos(this.idProfesor).subscribe(
      (response) => {
        console.log(response);
        this.cursos = response.cursos;
        console.log(this.cursos);
      },(error) => {
        console.log(error)
      }
    )
  }

}
