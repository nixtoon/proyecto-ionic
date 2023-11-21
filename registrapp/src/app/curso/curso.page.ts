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
  value: string = this.cursoId;

  constructor(private router: Router, private activeroute : ActivatedRoute) { 
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.qrdata = this.router.getCurrentNavigation()?.extras.state?.['idCurso'];
    }
  }

  ngOnInit() {
    console.log(this.qrdata);
  }

}
