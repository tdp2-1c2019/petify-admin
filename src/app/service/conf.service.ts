import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { snapshotToArray } from './SnapshotToArray';

export interface Precio {
    precioMascota: string,
    precioMinuto: string,
    precioKm: string,
    precioAcom: string,
    multiplicadorHN: string,
    inicioHN: string,
    finHN: string
}

@Injectable({
  providedIn: 'root'
})
export class ConfService {
  private database: firebase.database.Database;
  private confRef: firebase.database.Reference;

  constructor() {
    this.database = firebase.database();
    this.confRef = this.database.ref('conf');
  }

  async getConf(): Promise<Precio> {
    return this.confRef.once('value').then(x => x.val());
  }

  setConf(conf: Precio) {
    this.confRef.set(conf);
  }
}
