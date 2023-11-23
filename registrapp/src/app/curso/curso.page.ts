import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { QrCodeModule } from 'ng-qrcode';
import { ApiService } from '../servicios/api.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.page.html',
  styleUrls: ['./curso.page.scss'],
})
export class CursoPage implements OnInit {

  profesorId: string='';
  cursoId: string='';
  public qrdata: String = '';

    // variables curso
    nombreCurso: string = '';
    codigoCurso: string = '';
    seccionCurso: string = '';
    profesorCurso: string = '';

  constructor(private router: Router, private apiService: ApiService) { 
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.cursoId = this.router.getCurrentNavigation()?.extras.state?.['idCurso'];
    }
  }

  ngOnInit() {
    this.apiService.detalleCurso(this.cursoId).subscribe(
      (response) => {
        console.log(response);
        this.nombreCurso = response.curso.nombre;
        this.codigoCurso = response.curso.codigo;
        this.seccionCurso = response.curso.seccion;
        this.profesorCurso = response.curso.profesor;
        this.qrdata = this.cursoId + ';' + this.nombreCurso + ';' + this.codigoCurso + ';' + this.seccionCurso;
      },(error) => {
        console.log(error)
      }
    )
  }

}
