import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

export interface Customer {
  fbid: string;
  direccion: string;
  email: string;
  habilitado: boolean;
  name: string;
  telefono: string;
  telefonoEmergencia: string;
}

export interface Driver {
  fbid: string;
  cargoAuto: boolean;
  cargoRegistro: boolean;
  cargoSeguro: boolean;
  direccion: string;
  disponible: boolean;
  email: string;
  habilitado: boolean;
  name: string;
  telefono: string;
  telefonoEmergencia: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private database: firebase.database.Database;
  private customersRef;
  private driversRef;

  constructor() {
    this.database = firebase.database();
    this.customersRef = this.database.ref('customers');
    this.driversRef = this.database.ref('drivers');
  }

  async getCustomers(): Promise<Customer[]> {
    return this.customersRef.once('value').then(snapshotToArray);
  }

  async getDrivers(): Promise<Driver[]> {
    return this.driversRef.once('value').then(snapshotToArray);
  }
}

export const snapshotToArray = usersSnapshot => {
  const usersObject = usersSnapshot.val();
  const users = [];
  for (const fbid of Object.keys(usersObject)) {
    users.push({fbid, ...usersObject[fbid]});
  }
  return users;
};
