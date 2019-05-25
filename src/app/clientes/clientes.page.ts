import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer, UsuariosService } from '../service/usuarios.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-clientes',
  templateUrl: 'clientes.page.html',
  styleUrls: ['clientes.page.scss'],
})
export class ClientesPage implements OnInit, OnDestroy {
  private customersObserverSubscription: Subscription;
  private customers: Customer[];

  private columnsToDisplay: string[] = ['nombre', 'email', 'puntuacion'];

  constructor(
    private router: Router,
    private usuariosService: UsuariosService) {
  }

  ngOnInit() {
    this.customersObserverSubscription = this.usuariosService.getCustomersObserver().subscribe((customers => this.customers = customers));
  }

  ngOnDestroy() {
    this.customersObserverSubscription.unsubscribe();
  }

  detailsCustomer(fbid: string) {
    this.router.navigateByUrl(`/usuario/${fbid}`);
  }

}
