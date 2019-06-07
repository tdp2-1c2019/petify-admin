import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Usuario, UsuariosService } from '../service/usuarios.service';
import { Viaje, ViajesService } from '../service/viajes.service';
import { Subscription } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { ImageViewerComponent } from '../component/image-viewer/image-viewer.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit, OnDestroy {
  private usuario: Usuario = {name: 'Cargando...', fbid: '', email: ''};
  private imagenesUrls = {
    auto: null,
    registro: null,
    seguro: null,
  };

  private viajesObserverSubscription: Subscription;
  private viajes: Viaje[];

  private columnsToDisplay: string[];

  constructor(
    public modalController: ModalController,
    private route: ActivatedRoute,
    private router: Router,
    private storage: AngularFireStorage,
    private viajesService: ViajesService,
    private usuariosService: UsuariosService) {
  }

  async ngOnInit() {
    const fbid: string = this.route.snapshot.paramMap.get('id');
    this.usuario = await this.usuariosService.getUsuario(fbid);
    if (this.usuario.isDriver) {
      this.imagenesUrls.auto = this.usuario.cargoAuto
        ? await this.storage.ref(`drivers/${this.usuario.fbid}/auto`).getDownloadURL().toPromise()
        : 'assets/images/no-image.png';
      this.imagenesUrls.seguro = this.usuario.cargoSeguro
        ? await this.storage.ref(`drivers/${this.usuario.fbid}/seguro`).getDownloadURL().toPromise()
        : 'assets/images/no-image.png';
      this.imagenesUrls.registro = this.usuario.cargoRegistro
        ? await this.storage.ref(`drivers/${this.usuario.fbid}/registro`).getDownloadURL().toPromise()
        : 'assets/images/no-image.png';
    }

    if (this.usuario.isDriver) {
      this.columnsToDisplay = ['fecha', 'estado', 'origen', 'precio'];
    } else {
      this.columnsToDisplay = ['fecha', 'estado', 'chofer', 'origen', 'precio'];
    }
    this.viajesObserverSubscription = this.viajesService.getViajesObserver().subscribe((viajes => {
      this.viajes = viajes
        .filter((viaje) => this.usuario.fbid === (this.usuario.isDriver ? viaje.chofer : viaje.pasajero))
        .sort((primero, segundo) => new Date(segundo.fecha).getTime() - new Date(primero.fecha).getTime());
    }));
  }

  ngOnDestroy() {
    this.viajesObserverSubscription.unsubscribe();
  }

  habilitarUsuario(fbid: string) {
    this.usuariosService.habilitacionUsuario(this.usuario, true);
    this.usuario.habilitado = true;
  }

  deshabilitarUsuario(fbid: string) {
    this.usuariosService.habilitacionUsuario(this.usuario, false);
    this.usuario.habilitado = false;
  }

  async viewImage(src: string, title: string = '', description: string = '') {
    const modal = await this.modalController.create({
      component: ImageViewerComponent,
      componentProps: {
        imgSource: src,
        imgTitle: title,
        imgDescription: description
      },
      cssClass: 'modal-fullscreen',
      keyboardClose: true,
      showBackdrop: true
    });

    return await modal.present();
  }

  detailsViaje(viajeId: string) {
    this.router.navigateByUrl(`/viaje/${viajeId}`);
  }

  viajeEnCurso(viaje: Viaje) {
    return viaje.estado > 0 && viaje.estado < 5;
  }

  viajeCancelado(viaje: Viaje) {
    return viaje.estado > 10 && viaje.estado !== 90;
  }

  getCuentaViajes() {
    return this.viajes.filter(viaje => viaje.estado <= 5).length;
  }

  getTotalViajes() {
    return this.viajes
      .filter(viaje => viaje.estado <= 5)
      .map(viaje => viaje.precio)
      .reduce((accu, precio) => accu + precio, 0);
  }
}
