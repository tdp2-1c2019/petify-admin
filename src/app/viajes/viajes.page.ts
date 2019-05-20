import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Viaje, ViajesService } from '../service/viajes.service';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage {
  private viajes: Viaje[];

  constructor(private router: Router, private viajesServie: ViajesService) {
  }

  ionViewWillEnter() {
    this.viajesServie.getViajes().then(viajes => this.viajes = viajes);
  }

  detailsViaje(viaje: Viaje) {
    if (this.isClickeable(viaje)) {
      this.router.navigateByUrl(`/viajes/${viaje.id}`);
    }
  }

  isClickeable(viaje: Viaje) {
    return viaje.estado > 0 && viaje.estado < 5;
  }
}
