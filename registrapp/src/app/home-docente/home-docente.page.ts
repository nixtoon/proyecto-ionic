import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../servicios/api.service';

@Component({
  selector: 'app-home-docente',
  templateUrl: './home-docente.page.html',
  styleUrls: ['./home-docente.page.scss'],
})
export class HomeDocentePage implements OnInit {


  public qrdata: String = '';
  value = '65557bc3f2aa3ad1a160776f'; //curso id
  nombreUsuario: string = '';
  docenteId: string = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private apiService: ApiService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.nombreUsuario = navigation.extras.state['nombreUsuario'];
      this.docenteId = navigation.extras.state['docenteId'];
    }
  }

  getCursos(){
    this.apiService.getCursos(this.docenteId).subscribe(
      (response) => {
        if(response){
          console.log(response);
        }
      },
      (err) => {
        console.log(err);
      }
    )
  }

  ngOnInit(): void {
    this.qrdata = this.value;
    console.log(this.docenteId);
    console.log(this.getCursos());
  }
}
