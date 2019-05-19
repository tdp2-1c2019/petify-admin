import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Precio, ConfigurationService } from '../service/configuration.service';

@Component({
  selector: 'app-list',
  templateUrl: 'configuracion.page.html',
  styleUrls: ['configuracion.page.scss']
})
export class ConfigurationPage {
  private conf: Precio;
  private precioMinuto: string;
  private precioMascota: string;
  private precioKm: string;
  private precioAcom: string;
  private multiplicadorHN: string;
  private inicioHN: string;
  private finHN: string;

  constructor(private router: Router, private configurationService: ConfigurationService) {
  }

  ionViewWillEnter() {
    this.configurationService.getConfiguration().then(conf => this.conf = conf);
  }

  guardarConfiguration() {
    const configuration = JSON.parse(JSON.stringify(this.conf));
    if (this.precioMinuto !== undefined) {configuration.precioMinuto = this.precioMinuto; }
    if (this.precioMascota !== undefined) {configuration.precioMascota = this.precioMascota; }
    if (this.precioKm !== undefined) {configuration.precioKm = this.precioKm; }
    if (this.precioAcom !== undefined) {configuration.precioAcom = this.precioAcom; }
    if (this.multiplicadorHN !== undefined) {configuration.multiplicadorHN = this.multiplicadorHN; }
    if (this.inicioHN !== undefined) {configuration.inicioHN = this.inicioHN; }
    if (this.finHN !== undefined) {configuration.finHN = this.finHN; }
    console.log(JSON.stringify(configuration));
    this.configurationService.setConfiguration(configuration);
  }
}
