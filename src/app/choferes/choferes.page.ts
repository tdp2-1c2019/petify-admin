import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Driver, UsuariosService } from '../service/usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: 'choferes.page.html',
  styleUrls: ['choferes.page.scss'],
})
export class ChoferesPage {
  private drivers: Driver[];

  constructor(private router: Router, private usuariosService: UsuariosService) {
  }

  ionViewWillEnter() {
    this.usuariosService.getDrivers().then(drivers => this.drivers = drivers);
  }

  detailsDriver(fbid: string) {
    this.router.navigateByUrl(`/usuario/${fbid}`);
  }

}
