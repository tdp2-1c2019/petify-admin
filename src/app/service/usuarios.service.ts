import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

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
  providedIn: 'root',
})
export class UsuariosService {
  private database: firebase.database.Database;
  private functions: firebase.functions.Functions;
  private customersRef: firebase.database.Reference;
  private driversRef: firebase.database.Reference;

  private driversReference: AngularFireList<Driver>;
  private driversObserver: Observable<Driver[]>;
  private drivers: Driver[];

  private customersReference: AngularFireList<Customer>;
  private customersObserver: Observable<Customer[]>;
  private customers: Customer[];

  constructor(public db: AngularFireDatabase) {
    this.functions = firebase.functions();
    this.database = firebase.database();
    this.customersRef = this.database.ref('customers');
    this.driversRef = this.database.ref('drivers');

    this.driversReference = db.list<Driver>('drivers');
    this.driversObserver = this.driversReference.valueChanges();
    this.driversObserver.subscribe(drivers => this.drivers = drivers);

    this.customersReference = db.list<Customer>('customers');
    this.customersObserver = this.customersReference.valueChanges();
    this.customersObserver.subscribe(customers => this.customers = customers);
  }

  getCustomersObserver(): Observable<Customer[]> {
    return this.customersObserver;
  }

  getPasajero(fbid: string) {
    return this.customers.find(customer => customer.fbid === fbid);
  }

  getDriversObserver(): Observable<Driver[]> {
    return this.driversObserver;
  }

  getDriver(fbid: string) {
    return this.drivers.find(driver => driver.fbid === fbid);
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
    usuarioRef = (usuario.isDriver ? this.driversRef : this.customersRef);
    usuarioRef = usuarioRef.child(`${usuario.fbid}habilitado`);
    usuarioRef.set(habilitado);
  }
}
