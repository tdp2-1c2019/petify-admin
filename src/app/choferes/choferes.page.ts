import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Driver, UsuariosService } from '../service/usuarios.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-choferes',
  templateUrl: 'choferes.page.html',
  styleUrls: ['choferes.page.scss'],
})
export class ChoferesPage implements OnInit, OnDestroy {
  private driversObserverSubscription: Subscription;
  private drivers: Driver[];

  private columnsToDisplay: string[] = ['nombre', 'email', 'habilitado'];

  constructor(
    private router: Router,
    private usuariosService: UsuariosService) {
  }

  ngOnInit() {
    this.driversObserverSubscription = this.usuariosService.getDriversObserver().subscribe((drivers => this.drivers = drivers));
  }

  ngOnDestroy() {
    this.driversObserverSubscription.unsubscribe();
  }

  detailsDriver(fbid: string) {
    this.router.navigateByUrl(`/usuario/${fbid}`);
  }

}
