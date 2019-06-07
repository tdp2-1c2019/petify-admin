import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UsuarioPage } from './usuario.page';
import { MatExpansionModule, MatTableModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: UsuarioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatExpansionModule,
  ],
  declarations: [UsuarioPage]
})
export class UsuarioPageModule {}
