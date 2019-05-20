import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Viaje, ViajesService } from '../service/viajes.service';
import { UsuariosService, Driver } from '../service/usuarios.service';

declare var google;

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss']
})
export class ViajePage {
  private viajeId: string;
  private chofer: Driver;
  private viaje: Viaje;
  private marker: any;
  private map: any;
  @ViewChild('map') mapElement: ElementRef

  constructor(private route: ActivatedRoute, private router: Router, private viajesService: ViajesService, private userService: UsuariosService) {
    this.viajeId = this.route.snapshot.paramMap.get("id");
  }

  ionViewWillEnter() {
    this.viajesService.getViaje(this.viajeId).then(v => {
      this.viaje = v;
      this.map = this.loadMap(v.origin_latitude, v.origin_longitude, v.destination_latitude, v.destination_longitude);
      // console.log(ch.lat)
      this.userService.getDriver(v.chofer).then(ch => {
        this.marker = new google.maps.Marker({
          position:{lat:ch.lat, lng: ch.lng},
          map: this.map,
          icon: {url: 'assets/icon/car.png'}
        })
      });
    });
  }

  loadMap(olat: number, olng: number, dlat:number, dlng:number) {
    return new google.maps.Map(this.mapElement.nativeElement, {
      center: {lat: (olat+dlat)/2, lng: (olng + dlng)/2},
      zoom: 14
    })
  }

  back(){
    this.router.navigateByUrl(`/viajes`);
  }
}
