import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ChoferesPage } from './choferes.page';
import { MatTableModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ChoferesPage,
      },
    ]),
    MatTableModule,
  ],
  declarations: [ChoferesPage]
})
export class ChoferesPageModule {}
