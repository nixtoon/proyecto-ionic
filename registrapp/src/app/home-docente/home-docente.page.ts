import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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


  constructor(private activatedRoute: ActivatedRoute, private router: Router, private apiService: ApiService) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.nombreUsuario = this.router.getCurrentNavigation()?.extras.state?.['user'];
        this.idProfesor = this.router.getCurrentNavigation()?.extras.state?.['id'];
      }
  });


  }
  ngOnInit(): void {
    console.log(this.idProfesor);
    this.apiService.getCursos(this.idProfesor).subscribe(data => {
      this.cursos = data;
      console.log(this.cursos);
    });
  }
  
}
