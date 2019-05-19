import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Precio, ConfService } from '../service/conf.service';

@Component({
  selector: 'app-list',
  templateUrl: 'configuracion.page.html',
  styleUrls: ['configuracion.page.scss']
})
export class CfgPage {
  private conf: Precio;
  private precioMinuto: String;
  private precioMascota: String;
  private precioKm: String;
  private precioAcom: String;
  private multiplicadorHN: String;
  private inicioHN: String;
  private finHN: String;

  constructor(private router: Router, private confService: ConfService) {
  }

  ionViewWillEnter() {
    this.confService.getConf().then(conf => this.conf = conf);
  }

  guardar() {
    let cfg = JSON.parse(JSON.stringify(this.conf));
    if (this.precioMinuto != undefined) cfg.precioMinuto = this.precioMinuto;
    if (this.precioMascota != undefined) cfg.precioMascota = this.precioMascota;
    if (this.precioKm != undefined) cfg.precioKm = this.precioKm;
    if (this.precioAcom != undefined) cfg.precioAcom = this.precioAcom;
    if (this.multiplicadorHN != undefined) cfg.multiplicadorHN = this.multiplicadorHN;
    if (this.inicioHN != undefined) cfg.inicioHN = this.inicioHN;
    if (this.finHN != undefined) cfg.finHN = this.finHN;
    console.log(JSON.stringify(cfg))
    this.confService.setConf(cfg);
  }
}
