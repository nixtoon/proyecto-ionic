import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginDocentePageRoutingModule } from './login-docente-routing.module';

import { LoginDocentePage } from './login-docente.page';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginDocentePageRoutingModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  declarations: [LoginDocentePage]
})
export class LoginDocentePageModule {}
