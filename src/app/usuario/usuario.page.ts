import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Usuario, UsuariosService } from '../service/usuarios.service';
import { Viaje, ViajesService } from '../service/viajes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit, OnDestroy {
  private usuario: Usuario = {name: 'Cargando...', fbid: '', email: ''};
  private viajesObserverSubscription: Subscription;
  private viajes: Viaje[];

  private columnsToDisplay: string[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viajesService: ViajesService,
    private usuariosService: UsuariosService) {
  }

  ngOnInit() {
    const fbid: string = this.route.snapshot.paramMap.get('id');
    this.usuariosService.getUsuario(fbid).then(usuario => {
      this.usuario = usuario;
      if (usuario.isDriver) {
        this.columnsToDisplay = ['fecha', 'estado', 'origen', 'precio'];
      } else {
        this.columnsToDisplay = ['fecha', 'estado', 'chofer', 'origen', 'precio'];
      }
      this.viajesObserverSubscription = this.viajesService.getViajesObserver().subscribe((viajes => {
        this.viajes = viajes
          .filter((viaje) => this.usuario.fbid === (this.usuario.isDriver ? viaje.chofer : viaje.pasajero))
          .sort((primero, segundo) => new Date(segundo.fecha).getTime() - new Date(primero.fecha).getTime());
      }));
    });
  }

  ngOnDestroy() {
    this.viajesObserverSubscription.unsubscribe();
  }

  habilitarChofer(fbid: string) {
    this.usuariosService.habilitacionUsuario(this.usuario, true);
    this.usuario.habilitado = true;
  }

  deshabilitarChofer(fbid: string) {
    this.usuariosService.habilitacionUsuario(this.usuario, false);
    this.usuario.habilitado = false;
  }

  detailsViaje(viajeId: string) {
    this.router.navigateByUrl(`/viaje/${viajeId}`);
  }

  viajeEnCurso(viaje: Viaje) {
    return viaje.estado > 0 && viaje.estado < 5;
  }

  viajeCancelado(viaje: Viaje) {
    return viaje.estado > 10 && viaje.estado !== 90;
  }

  getCuentaViajes() {
    return this.viajes.filter(viaje => viaje.estado <= 5).length;
  }

  getTotalViajes() {
    return this.viajes
      .filter(viaje => viaje.estado <= 5)
      .map(viaje => viaje.precio)
      .reduce((accu, precio) => accu + precio, 0);
  }
}
