import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { snapshotToArray } from './SnapshotToArray';

export const VIAJE_CREADO = 1;
export const CHOFER_ASIGNADO = 1;
export const CHOFER_YENDO = 2;
export const CHOFER_EN_PUERTA = 3;
export const EN_CURSO = 4;
export const FINALIZADO = 5;
export const RECHAZADO = -999;
export const CANCELADO = 20;
export const CANCELADO_GRUPO = -90;

export interface Viaje {
  cantChoferes?: number;
  cantMascotas: string;
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
  precio: string;
  puntaje_chofer: number;
  puntaje_pasajero: number;
  viajaAcompanante: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ViajesService {
  private database: firebase.database.Database;
  private viajesRef: firebase.database.Reference;

  constructor() {
    this.database = firebase.database();
    this.viajesRef = this.database.ref('viajes');
  }

  async getViajes(): Promise<Viaje[]> {
    return this.viajesRef.once('value').then(snapshotToArray);
  }

  async getViaje(id: string): Promise<Viaje> {
    return this.viajesRef.child(id).once('value').then(x => x.val());
  }
}
