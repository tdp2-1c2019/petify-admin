import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';

export interface Viaje {
  cantChoferes?: number;
  cantidadMascotas: string;
  chofer?: string;
  destination_address: string;
  destination_latitude: number;
  destination_longitude: number;
  duracion: number;
  estado: number;
  eta?: string;
  fecha: string;
  formaPago: string;
  id: string;
  intentosAsignacion?: number;
  observaciones?: string;
  origin_address: string;
  origin_latitude: number;
  origin_longitude: number;
  pasajero: string;
  precio: number;
  puntaje_chofer?: number;
  puntaje_pasajero?: number;
  viajaAcompanante: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ViajesService {
  private viajesReference: AngularFireList<Viaje>;
  private viajesObserver: Observable<Viaje[]>;
  private viajes: Viaje[];

  public ESTADO_NOMBRE = {
    1: 'Chofer asignado',
    2: 'Chofer yendo',
    3: 'Chofer esperando',
    4: 'En curso',
    5: 'Finalizado',
    999: 'Rechazado por choferes',
    20: 'Cancelado por usuario',
    90: 'Espera continuar busqueda',
  };

  constructor(public db: AngularFireDatabase) {
    this.viajesReference = db.list('viajes');
    this.viajesObserver = this.viajesReference.valueChanges();
    this.viajesObserver.subscribe(viajes => this.viajes = viajes);
  }

  getViajesObserver(): Observable<Viaje[]> {
    return this.viajesObserver;
  }

  syncViaje(viajeId: string): Observable<Viaje> {
    const viajeObserver: AngularFireObject<Viaje> = this.db.object(`viajes/${viajeId}`);
    return viajeObserver.valueChanges();
  }
}
