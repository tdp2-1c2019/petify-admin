import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

export interface Precio {
  precioMascota: string;
  precioMinuto: string;
  precioKm: string;
  precioAcom: string;
  multiplicadorHN: string;
  inicioHN: string;
  finHN: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  private database: firebase.database.Database;
  private configurationRef: firebase.database.Reference;

  constructor() {
    this.database = firebase.database();
    this.configurationRef = this.database.ref('conf');
  }

  async getConfiguration(): Promise<Precio> {
    return this.configurationRef.once('value').then(x => x.val());
  }

  setConfiguration(conf: Precio) {
    this.configurationRef.set(conf);
  }
}
