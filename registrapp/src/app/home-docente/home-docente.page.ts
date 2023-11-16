import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-docente',
  templateUrl: './home-docente.page.html',
  styleUrls: ['./home-docente.page.scss'],
})
export class HomeDocentePage implements OnInit {

  public qrdata: String = '';
  value = '65557bc3f2aa3ad1a160776f'; //curso id

  constructor() { }

  ngOnInit() {
    this.qrdata = this.value;
  }

}
