import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginAlPage } from './login-al.page';

const routes: Routes = [
  {
    path: '',
    component: LoginAlPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginAlPageRoutingModule {}
