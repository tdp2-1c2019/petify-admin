import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Viaje, ViajesService } from '../service/viajes.service';
import { Subscription } from 'rxjs';
import { UsuariosService } from '../service/usuarios.service';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage implements OnInit, OnDestroy {
  private viajesObserverSubscription: Subscription;
  private viajesMostrar: Viaje[];
  private viajes: Viaje[];
  private textoBuscar: string;
  private columnsToDisplay: string[] = ['fecha', 'estado', 'chofer', 'origen', 'precio'];

  constructor(
    private router: Router,
    private viajesService: ViajesService,
    private usuariosService: UsuariosService) {
  }

  ngOnInit() {
    this.viajesObserverSubscription = this.viajesService.getViajesObserver().subscribe((viajes => {
      this.viajes = viajes;
      this.viajesMostrar = viajes;
    }));
  }

  ngOnDestroy() {
    this.viajesObserverSubscription.unsubscribe();
  }

  detailsViaje(viajeId: string) {
    this.router.navigateByUrl(`/viaje/${viajeId}`);
  }

  enCurso(v: Viaje) {
    return v.estado > 0 && v.estado < 5;
  }

  buscar() {
    console.log(this.textoBuscar);
    if (this.textoBuscar != "")
      this.viajesMostrar = this.viajes.filter((v) => {
        let driver = this.usuariosService.getDriver(v.chofer);
        if (driver != undefined)
          return driver.name.toLowerCase().includes(this.textoBuscar.toLowerCase());
        return false;
      });
    else
      this.viajesMostrar = this.viajes;
  }
}
