import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginAlPageRoutingModule } from './login-al-routing.module';

import { LoginAlPage } from './login-al.page';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginAlPageRoutingModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  declarations: [LoginAlPage]
})
export class LoginAlPageModule {}
