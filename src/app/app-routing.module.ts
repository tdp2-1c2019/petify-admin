import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'choferes',
    pathMatch: 'full'
  },
  {
    path: 'choferes',
    loadChildren: './choferes/choferes.module#ChoferesPageModule'
  },
  {
    path: 'clientes',
    loadChildren: './clientes/clientes.module#ClientesPageModule'
  },
  {
    path: 'usuario/:id',
    loadChildren: './usuario/usuario.module#UsuarioPageModule'
  },
  {
    path: 'viajes',
    loadChildren: './viajes/viajes.module#ViajesPageModule'
  },
  {
    path: 'configuracion',
    loadChildren: './configuracion/configuracion.module#CfgPageModule'
  },
  {
    path: 'viajes/:id',
    loadChildren: './viaje/viaje.module#ViajePageModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
