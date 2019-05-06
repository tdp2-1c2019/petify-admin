import { Component } from '@angular/core';
import { Driver, UsuariosService } from '../service/usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: 'choferes.page.html',
  styleUrls: ['choferes.page.scss'],
})
export class ChoferesPage {
  private drivers: Driver[];

  constructor(private usuariosService: UsuariosService) {
    usuariosService.getDrivers().then(drivers => this.drivers = drivers);
  }

}
