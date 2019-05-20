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
  private viajes: Viaje[];

  private columnsToDisplay: string[] = ['fecha', 'estado', 'chofer', 'origen', 'precio'];

  constructor(
    private router: Router,
    private viajesService: ViajesService,
    private usuariosService: UsuariosService) {
  }

  ngOnInit() {
    this.viajesObserverSubscription = this.viajesService.getViajesObserver().subscribe((viajes => this.viajes = viajes));
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
}
