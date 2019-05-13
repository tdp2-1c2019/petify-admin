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

  detailsViaje(viajeId: string) {
    this.router.navigateByUrl(`/viaje/${viajeId}`);
  }

}
