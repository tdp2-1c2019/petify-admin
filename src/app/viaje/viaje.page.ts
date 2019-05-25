import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Viaje, ViajesService } from '../service/viajes.service';
import { UsuariosService } from '../service/usuarios.service';

declare var google;

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage {
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

  private map: any;
  private marker: any;
  @ViewChild('map') mapElement: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private usuariosService: UsuariosService,
    private viajesService: ViajesService,
    private router: Router) { }

  async ionViewWillEnter() {
    const viajeId: string = this.route.snapshot.paramMap.get('id');
    this.viajesService.syncViaje(viajeId).subscribe((v) => {
      this.viaje = v;
      if (this.enCurso(v)) {
        this.map = this.loadMap(v.origin_latitude, v.origin_longitude, v.destination_latitude, v.destination_longitude);
        this.usuariosService.getDriverObserver(v.chofer).subscribe((ch) => {
          this.marker = new google.maps.Marker({
            position: { lat: ch.lat, lng: ch.lng },
            map: this.map,
            icon: { url: 'assets/icon/car.png' }
          })
        });
      }
    });
  }

  loadMap(olat: number, olng: number, dlat: number, dlng: number) {
    return new google.maps.Map(this.mapElement.nativeElement, {
      center: { lat: (olat + dlat) / 2, lng: (olng + dlng) / 2 },
      zoom: 14,
    });
  }

  enCurso(v: Viaje) {
    return v.estado > 0 && v.estado < 5;
  }
}
