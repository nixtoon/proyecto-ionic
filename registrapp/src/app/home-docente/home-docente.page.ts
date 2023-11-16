import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-docente',
  templateUrl: './home-docente.page.html',
  styleUrls: ['./home-docente.page.scss'],
})
export class HomeDocentePage implements OnInit {

  public qrdata: String = '';
  value = '65557bc3f2aa3ad1a160776f'; //curso id
  nombreUsuario: string = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.nombreUsuario = navigation.extras.state['nombreUsuario'];
    }
   }

  ngOnInit() {
    this.qrdata = this.value;
  }

}
