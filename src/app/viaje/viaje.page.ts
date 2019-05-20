import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Viaje, ViajesService } from '../service/viajes.service';
import { GoogleMap, GoogleMaps } from '@ionic-native/google-maps';
import { Platform } from '@ionic/angular';
import { Usuario, UsuariosService } from '../service/usuarios.service';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {
  private viaje: Viaje = {
    cantidadMascotas: '-',
    destination_address: '',
    destination_latitude: null,
    destination_longitude: null,
    duracion: 0,
    estado: 1,
    fecha: '2010/01/01',
    formaPago: '',
    id: 'Cargando...',
    observaciones: '',
    origin_address: '',
    origin_latitude: null,
    origin_longitude: null,
    pasajero: null,
    precio: 0,
    viajaAcompanante: false,
  };

  private map: GoogleMap;

  constructor(
    private route: ActivatedRoute,
    private platform: Platform,
    private usuariosService: UsuariosService,
    private viajesService: ViajesService) { }

  async ngOnInit() {
    const viajeId: string = this.route.snapshot.paramMap.get('id');
    this.viajesService.syncViaje(viajeId).subscribe((viaje) => {
      this.viaje = viaje;
    });
    await this.platform.ready();
    await this.loadMap();
  }

  loadMap() {
    this.map = GoogleMaps.create('map_canvas');
  }

}
