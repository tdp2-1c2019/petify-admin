import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

export interface Usuario {
  fbid: string;
  cargoAuto?: boolean;
  cargoRegistro?: boolean;
  cargoSeguro?: boolean;
  direccion?: string;
  disponible?: boolean;
  email: string;
  habilitado?: boolean;
  isCustomer?: boolean;
  isDriver?: boolean;
  name: string;
  telefono?: string;
  telefonoEmergencia?: string;
}

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
  private functions: firebase.functions.Functions;
  private customersRef: firebase.database.Reference;
  private driversRef: firebase.database.Reference;

  constructor() {
    this.functions = firebase.functions();
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

  async getUsuario(fbid: string): Promise<Usuario> {
    const findUser = this.functions.httpsCallable('findUser');
    return findUser({fbid}).then(user => {
      const usuario: Usuario = user.data;
      return usuario;
    });
  }

  habilitacionUsuario(usuario: Usuario, habilitado: boolean) {
    let usuarioRef: firebase.database.Reference;
    if (usuario.isDriver) {
      usuarioRef = this.driversRef;
    } else {
      usuarioRef = this.customersRef;
    }
    usuarioRef = usuarioRef.child(usuario.fbid);
    usuarioRef.child('habilitado').set(habilitado);
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
